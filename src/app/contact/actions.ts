"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { z } from "zod";
import {
  enquiryFields,
  enquirySchema,
  type Enquiry,
  type EnquiryField,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

// Per-IP limit. In-memory, so it resets on deploy and is per-instance on
// serverless hosts — enough to blunt form spam; use a shared store (e.g.
// Upstash) if the site ever runs on many instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return false;
}

function formatEnquiry(enquiry: Enquiry) {
  const item = getProduct(enquiry.item)?.name ?? "General enquiry";
  return [
    `Name:    ${enquiry.name}`,
    `Phone:   ${enquiry.phone}`,
    `Email:   ${enquiry.email || "—"}`,
    `About:   ${item}`,
    "",
    enquiry.message,
  ].join("\n");
}

// Delivery: email through Resend when it is configured (see .env.example).
// Without it, enquiries are appended to .data/enquiries.jsonl so nothing is
// lost during local development or on a self-hosted server.
async function deliver(enquiry: Enquiry) {
  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;

  if (RESEND_API_KEY && ENQUIRY_TO_EMAIL) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL ?? `${site.shortName} website <onboarding@resend.dev>`,
        to: [ENQUIRY_TO_EMAIL],
        reply_to: enquiry.email || undefined,
        subject: `New enquiry from ${enquiry.name}`,
        text: formatEnquiry(enquiry),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return;
  }

  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "enquiries.jsonl"),
    JSON.stringify({ receivedAt: new Date().toISOString(), ...enquiry }) + "\n",
    "utf8",
  );
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const read = (field: string) => {
    const value = formData.get(field);
    return typeof value === "string" ? value.slice(0, 5000) : "";
  };
  const values = Object.fromEntries(
    enquiryFields.map((field) => [field, read(field)]),
  ) as EnquiryValues;

  // Honeypot: real visitors never see or fill this field. Bots get a
  // success response so they have nothing to adapt to.
  if (read("website") !== "") {
    return { status: "success", name: values.name };
  }

  const parsed = enquirySchema.safeParse(values);
  if (!parsed.success) {
    const flat = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: Partial<Record<EnquiryField, string>> = {};
    for (const field of enquiryFields) {
      if (flat[field]?.[0]) fieldErrors[field] = flat[field][0];
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: `You have sent several messages in a short time. Please wait a few minutes, or call us on ${site.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  try {
    await deliver(parsed.data);
  } catch (error) {
    console.error("Enquiry delivery failed:", error);
    return {
      status: "error",
      message: `We couldn't send your message just now. Please try again, or call us on ${site.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  return { status: "success", name: parsed.data.name };
}
