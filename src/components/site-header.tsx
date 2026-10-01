"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogMark } from "@/components/log-mark";
import { nav, site } from "@/lib/site";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-forest/95 shadow-[0_1px_0_rgb(236_238_230/0.1)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${site.name} — home`}
            onClick={() => setOpen(false)}
          >
            <LogMark className="h-9 w-9 shrink-0" />
            <span className="leading-none">
              <span className="display block text-[1.45rem] tracking-wide">
                {site.shortName}
              </span>
              <span className="label mt-1 block text-[0.62rem] text-fog">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[0.95rem] font-medium text-paper/85 transition-colors hover:text-paper"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-vermilion transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary min-h-11 py-2">
              Get a quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-forest px-5 pt-28 pb-8 text-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease }}
                >
                  <Link
                    href={item.href}
                    className="display block border-b border-paper/15 py-4 text-5xl"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/contact"
              className="btn btn-primary mt-auto"
              onClick={() => setOpen(false)}
            >
              Get a quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
