"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { RisingLines } from "@/components/reveal";
import { site } from "@/lib/site";

// three.js is loaded after the page is interactive, never on the server.
const TimberCanvas = dynamic(() => import("@/components/three/timber-canvas"), {
  ssr: false,
});

const ease = [0.16, 1, 0.3, 1] as const;

function GrowthRings() {
  const radii = [60, 104, 152, 196, 250, 300, 362, 420, 492];
  return (
    <svg
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 text-paper/[0.07] lg:w-[125%]"
      fill="none"
      stroke="currentColor"
    >
      {radii.map((r, i) => (
        <motion.ellipse
          key={r}
          cx={500 + (i % 3) * 5}
          cy={500 - (i % 2) * 6}
          rx={r}
          ry={r * (0.97 + (i % 4) * 0.012)}
          strokeWidth={i % 3 === 0 ? 2.5 : 1.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.15 + i * 0.09, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest text-paper">
      <div className="container-page relative grid flex-1 items-center gap-4 pt-28 pb-10 lg:grid-cols-[1.05fr_1fr] lg:gap-0 lg:pb-12">
        <div className="relative z-10 max-w-2xl">
          <motion.p
            className="label flex items-center gap-3 text-fog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <span className="h-px w-8 bg-vermilion" />
            {site.address.line}, {site.address.district} · {site.address.country}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(3.6rem,10.5vw,9rem)]">
            <RisingLines lines={["From log", "to living", "room."]} delay={0.15} />
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg text-paper/75 md:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            We saw timber to size, sell ready-made wooden goods, and build
            beds, chairs and everyday household furniture to order — all from
            one yard in Dang.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
          >
            <Link href="/contact" className="btn btn-primary">
              Get a quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/products" className="btn btn-ghost-light">
              See what we make
            </Link>
          </motion.div>
        </div>

        <div className="relative h-[46svh] min-h-[320px] lg:h-[72svh]">
          <GrowthRings />
          <TimberCanvas mode="intro" className="absolute inset-0" />
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <dl className="container-page grid gap-x-10 gap-y-4 py-6 sm:grid-cols-3">
          {[
            ["Timber", "Sawn to your cut list"],
            ["Wooden goods", "Ready at the yard"],
            ["Furniture", "Built to your measurements"],
          ].map(([term, detail]) => (
            <div key={term} className="flex items-baseline gap-3">
              <dt className="label text-timber">{term}</dt>
              <dd className="text-paper/75">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
