"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

// Smooth wheel scrolling. Lenis still drives the native scroll position, so
// sticky layouts and GSAP ScrollTrigger keep working without extra wiring.
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    return () => lenis.destroy();
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  useSmoothScroll();

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
