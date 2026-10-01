import { z } from "zod";
import { products } from "@/lib/products";

export const enquiryFields = ["name", "phone", "email", "item", "message"] as const;
export type EnquiryField = (typeof enquiryFields)[number];
export type EnquiryValues = Record<EnquiryField, string>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<EnquiryField, string>>;
      values: EnquiryValues;
    };

const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();

export const enquirySchema = z.object({
  name: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .min(2, "Please enter your name.")
        .max(80, "Please keep your name under 80 characters."),
    ),
  phone: z
    .string()
    .transform(singleLine)
    .pipe(
      z
        .string()
        .regex(
          /^\+?\d[\d\s-]{6,17}$/,
          "Enter a phone number we can call you back on, digits only.",
        ),
    ),
  email: z
    .string()
    .transform(singleLine)
    .pipe(
      z.union([
        z.literal(""),
        z.email("That email address doesn't look right.").max(120),
      ]),
    ),
  item: z
    .string()
    .refine(
      (slug) => slug === "" || products.some((p) => p.slug === slug),
      "Choose an item from the list.",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — the item, the size and how many.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type Enquiry = z.infer<typeof enquirySchema>;
