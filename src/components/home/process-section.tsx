"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TimberCanvas = dynamic(() => import("@/components/three/timber-canvas"), {
  ssr: false,
});

const steps = [
  {
    title: "It starts as a log",
    body: "Timber comes into the mill in the round. We look it over, mark it, and plan the cuts before the saw starts.",
  },
  {
    title: "Sawn to size",
    body: "The log is sawn into planks and sections, then cut to the lengths the job needs. Every part of a piece comes off one cut list.",
  },
  {
    title: "Built into furniture",
    body: "The parts are joined, assembled and finished by hand into a piece made for your home.",
  },
];

export function ProcessSection() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const reduceMotion = useReducedMotion();

  // Mount the 3D scene only once the section is about to scroll into view.
  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  // The section is taller than the screen and its stage is sticky, so
  // scrolling through it scrubs the log → boards → chair sequence.
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          rail.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                progress.current = self.progress;
                const step = self.progress < 0.3 ? 0 : self.progress < 0.68 ? 1 : 2;
                setActive((current) => (current === step ? current : step));
              },
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className={`relative -scroll-mt-20 bg-forest text-paper ${reduceMotion ? "" : "h-[360vh]"}`}
    >
      <div
        className={`flex flex-col overflow-hidden ${reduceMotion ? "py-24" : "sticky top-0 h-[100svh] pt-[4.5rem]"}`}
      >
        <div className="container-page grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-2 py-6 lg:grid-cols-[minmax(0,26rem)_1fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:py-10">
          <div className="relative row-start-1 min-h-[240px] lg:col-start-2 lg:h-full">
            {near && (
              <TimberCanvas
                mode="scroll"
                progress={progress}
                className="absolute inset-0"
              />
            )}
          </div>

          <div className="lg:col-start-1 lg:row-start-1">
            <p className="label text-fog">How we work</p>
            <h2 className="display mt-3 text-[clamp(2.4rem,5.5vw,4.5rem)]">
              How a log becomes a chair
            </h2>

            <ol className="mt-6 min-h-[18.75rem] lg:mt-10 lg:min-h-[20.75rem]">
              {steps.map((step, i) => {
                const isActive = reduceMotion || active === i;
                return (
                  <li
                    key={step.title}
                    className={`border-t border-paper/15 py-3.5 transition-opacity duration-500 lg:py-5 ${isActive ? "opacity-100" : "opacity-40"}`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`label transition-colors duration-500 ${isActive ? "text-timber" : "text-fog"}`}
                      >
                        0{i + 1}
                      </span>
                      <h3 className="display text-2xl lg:text-3xl">{step.title}</h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          className="overflow-hidden pl-10 text-paper/75"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className="block pt-2">{step.body}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ol>

            {!reduceMotion && (
              <div className="h-0.5 bg-paper/15">
                <span
                  ref={rail}
                  className="block h-0.5 origin-left scale-x-0 bg-vermilion"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
