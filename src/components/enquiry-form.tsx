"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import type { EnquiryField, EnquiryState } from "@/lib/enquiry";
import { categories, getProduct, products } from "@/lib/products";

const initialState: EnquiryState = { status: "idle" };
const ease = [0.16, 1, 0.3, 1] as const;

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between font-semibold">
        {label}
        {optional && <span className="label text-moss">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-vermilion-deep">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryForm({ preselected = "" }: { preselected?: string }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  const failed = state.status === "error" ? state : null;
  const error = (field: EnquiryField) => failed?.fieldErrors[field];
  const value = (field: EnquiryField) => failed?.values[field];
  const describe = (field: EnquiryField) =>
    error(field)
      ? ({ "aria-invalid": true, "aria-describedby": `${field}-error` } as const)
      : {};

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="sent"
          role="status"
          className="rounded-[2px] bg-paper-deep p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <motion.span
            className="grid h-14 w-14 place-items-center rounded-full bg-forest text-paper"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          >
            <Check size={26} aria-hidden="true" />
          </motion.span>
          <h2 className="display mt-6 text-4xl md:text-5xl">Message sent</h2>
          <p className="mt-4 max-w-md text-lg text-moss">
            Thank you{state.name ? `, ${state.name}` : ""}. We have your
            enquiry and will call you back on the number you gave.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={formAction}
          noValidate
          className="grid gap-6"
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {failed && (
              <motion.p
                role="alert"
                className="rounded-[2px] border border-vermilion-deep/40 bg-vermilion/10 px-4 py-3 font-medium text-vermilion-deep"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {failed.message}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label="Your name" error={error("name")}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={80}
                defaultValue={value("name")}
                className="field"
                {...describe("name")}
              />
            </Field>
            <Field id="phone" label="Phone number" error={error("phone")}>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                maxLength={20}
                placeholder="98XXXXXXXX"
                defaultValue={value("phone")}
                className="field"
                {...describe("phone")}
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="email" label="Email" optional error={error("email")}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={120}
                defaultValue={value("email")}
                className="field"
                {...describe("email")}
              />
            </Field>
            <Field id="item" label="What is it about?" error={error("item")}>
              <select
                id="item"
                name="item"
                defaultValue={value("item") ?? preselected}
                className="field"
                {...describe("item")}
              >
                <option value="">General enquiry</option>
                {categories.map((category) => (
                  <optgroup key={category.id} label={category.label}>
                    {products
                      .filter((p) => p.category === category.id)
                      .map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </Field>
          </div>

          <Field id="message" label="What do you need?" error={error("message")}>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              maxLength={2000}
              placeholder="The item, the size (length × width × height) and how many."
              defaultValue={value("message")}
              className="field resize-y"
              {...describe("message")}
            />
          </Field>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-70">
              {pending ? (
                <>
                  Sending
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
            <p className="text-sm text-moss">
              We only use your details to reply to this enquiry.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// Reads ?product=<slug> so "Ask for a quote" on a product page arrives with
// that product already chosen.
export function EnquiryFormFromUrl() {
  const slug = useSearchParams().get("product") ?? "";
  const preselected = getProduct(slug)?.slug ?? "";
  return <EnquiryForm key={preselected} preselected={preselected} />;
}
