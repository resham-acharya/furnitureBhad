"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Headline whose lines rise out of a mask, one after another.
export function RisingLines({
  lines,
  className,
  delay = 0,
  onView = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  onView?: boolean;
}) {
  const trigger = onView
    ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -12% 0px" } }
    : { animate: "shown" };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "108%" },
              shown: { y: 0, transition: { duration: 1, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
