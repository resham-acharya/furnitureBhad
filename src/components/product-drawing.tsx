"use client";

import { motion, type Variants } from "motion/react";
import type { DrawingKind } from "@/lib/products";

// Products are shown as measured workshop drawings rather than photos:
// timber-filled parts, an ink outline, and one dimension line.

const part: Variants = {
  hidden: { pathLength: 0, fillOpacity: 0 },
  shown: (i: number) => ({
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: 0.9, delay: i * 0.06, ease: "easeInOut" },
      fillOpacity: { duration: 0.5, delay: 0.45 + i * 0.06 },
    },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.6, delay: 0.9 } },
};

type Box = [x: number, y: number, w: number, h: number, rx?: number];

function Wood({ boxes }: { boxes: Box[] }) {
  return boxes.map(([x, y, width, height, rx], i) => (
    <motion.rect
      key={i}
      variants={part}
      custom={i}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx ?? 0.5}
      fill="var(--color-timber)"
    />
  ));
}

function Outline({ boxes, dashed }: { boxes: Box[]; dashed?: boolean }) {
  return boxes.map(([x, y, width, height, rx], i) => (
    <motion.rect
      key={i}
      variants={fade}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx ?? 0}
      fill="none"
      strokeWidth={1}
      strokeDasharray={dashed ? "3 3" : undefined}
    />
  ));
}

function Ground() {
  return (
    <motion.line
      variants={fade}
      x1="18"
      y1="150.75"
      x2="222"
      y2="150.75"
      strokeWidth={1}
      strokeOpacity={0.35}
    />
  );
}

function Dimension({ from, to, label }: { from: number; to: number; label: string }) {
  const y = 166;
  const mid = (from + to) / 2;
  const gap = label.length * 2.9 + 5;
  const fits = to - from > gap * 2 + 12;

  return (
    <motion.g variants={fade} strokeWidth={1}>
      <path d={`M${from} ${y - 4}V${y + 4}M${to} ${y - 4}V${y + 4}`} />
      {fits ? (
        <path d={`M${from} ${y}H${mid - gap}M${mid + gap} ${y}H${to}`} />
      ) : (
        <path d={`M${from} ${y}H${to}`} />
      )}
      <text
        x={fits ? mid : to + 8}
        y={y + 3}
        textAnchor={fits ? "middle" : "start"}
        stroke="none"
        fill="currentColor"
        fontSize="8.5"
        letterSpacing="0.06em"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label.toUpperCase()}
      </text>
    </motion.g>
  );
}

function Shapes({ kind }: { kind: DrawingKind }) {
  switch (kind) {
    case "double-bed":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [34, 46, 9, 104],
              [30, 41, 17, 5],
              [197, 92, 9, 58],
              [43, 112, 154, 15],
            ]}
          />
          <Outline
            boxes={[
              [45, 96, 150, 16, 6],
              [50, 86, 36, 10, 5],
            ]}
          />
        </>
      );
    case "single-bed":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [34, 68, 9, 82],
              [197, 100, 9, 50],
              [43, 116, 154, 13],
            ]}
          />
          <Outline
            boxes={[
              [45, 103, 150, 13, 5],
              [50, 94, 32, 9, 4.5],
            ]}
          />
        </>
      );
    case "chair":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [84, 34, 8, 116],
              [148, 34, 8, 116],
              [92, 42, 56, 9],
              [92, 58, 56, 9],
              [92, 74, 56, 9],
              [80, 96, 80, 8],
              [92, 104, 56, 10],
              [92, 132, 56, 5],
            ]}
          />
        </>
      );
    case "table":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [36, 74, 168, 9],
              [55, 83, 130, 12],
              [46, 83, 9, 67],
              [185, 83, 9, 67],
            ]}
          />
        </>
      );
    case "wardrobe":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [58, 22, 124, 6],
              [62, 28, 116, 116],
              [66, 144, 108, 6],
            ]}
          />
          <motion.path
            variants={fade}
            d="M100.7 28V144M139.3 28V144M95 82v10M106 82v10M145 82v10"
            strokeWidth={1}
          />
          <Outline
            boxes={[
              [68, 35, 26.5, 102],
              [107, 35, 26, 102],
              [145.5, 35, 26.5, 102],
            ]}
          />
        </>
      );
    case "stool":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [76, 112, 88, 10],
              [84, 122, 9, 28],
              [147, 122, 9, 28],
              [93, 134, 54, 5],
            ]}
          />
        </>
      );
    case "chopping-board":
      return (
        <>
          <Wood boxes={[[62, 56, 116, 76, 6]]} />
          <motion.g variants={fade} strokeWidth={1}>
            <circle cx="164" cy="70" r="4.5" fill="var(--drawing-bg)" />
            <path
              d="M72 84h64M72 98h84M72 112h52"
              strokeOpacity={0.35}
            />
          </motion.g>
        </>
      );
    case "chauka-belna":
      return (
        <>
          <motion.circle
            variants={part}
            custom={0}
            cx="100"
            cy="88"
            r="44"
            fill="var(--color-timber)"
          />
          <motion.circle
            variants={fade}
            cx="100"
            cy="88"
            r="36"
            fill="none"
            strokeWidth={1}
            strokeOpacity={0.4}
          />
          <Wood
            boxes={[
              [181, 38, 6, 14, 3],
              [181, 124, 6, 14, 3],
              [177, 50, 14, 76, 7],
            ]}
          />
        </>
      );
    case "shelf":
      return (
        <>
          <Wood
            boxes={[
              [52, 40, 8, 104],
              [180, 40, 8, 104],
              [60, 66, 120, 7],
              [60, 112, 120, 7],
            ]}
          />
        </>
      );
    case "planks": {
      const rows = [136, 119, 102, 85];
      return (
        <>
          <Ground />
          <Wood
            boxes={rows.flatMap((y) =>
              [0, 1, 2, 3].map((i): Box => [56 + i * 33, y, 29, 12]),
            )}
          />
          <motion.g variants={fade} fill="var(--color-heartwood)" strokeWidth={1}>
            {rows.slice(0, 3).flatMap((y) =>
              [66, 165].map((x) => (
                <rect key={`${x}-${y}`} x={x} y={y - 5} width="9" height="5" />
              )),
            )}
          </motion.g>
        </>
      );
    }
    case "beams":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [56, 86, 64, 64],
              [136, 127, 21, 23],
              [160, 127, 21, 23],
              [184, 127, 21, 23],
              [136, 101, 21, 23],
              [160, 101, 21, 23],
              [184, 101, 21, 23],
            ]}
          />
          <motion.path
            variants={fade}
            d="M56 104a18 18 0 0 0 18-18M56 122a36 36 0 0 0 36-36M56 140a54 54 0 0 0 54-54M70 150a50 50 0 0 0 50-50"
            fill="none"
            strokeWidth={1}
            strokeOpacity={0.4}
          />
        </>
      );
    case "door-frame":
      return (
        <>
          <Ground />
          <Wood
            boxes={[
              [74, 26, 92, 10],
              [80, 36, 10, 114],
              [150, 36, 10, 114],
            ]}
          />
          <Outline
            dashed
            boxes={[
              [90, 36, 60, 114],
              [98, 46, 44, 40],
              [98, 96, 44, 44],
            ]}
          />
        </>
      );
  }
}

const dimensionSpan: Record<DrawingKind, [number, number]> = {
  "double-bed": [43, 197],
  "single-bed": [43, 197],
  chair: [80, 160],
  table: [36, 204],
  wardrobe: [62, 178],
  stool: [76, 164],
  "chopping-board": [62, 178],
  "chauka-belna": [56, 144],
  shelf: [52, 188],
  planks: [56, 184],
  beams: [56, 120],
  "door-frame": [90, 150],
};

export function ProductDrawing({
  kind,
  dimension,
  title,
  className,
}: {
  kind: DrawingKind;
  dimension: string;
  title: string;
  className?: string;
}) {
  const [from, to] = dimensionSpan[kind];

  return (
    <motion.svg
      viewBox="0 0 240 184"
      role="img"
      aria-label={`Workshop drawing of a ${title.toLowerCase()}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
    >
      <Shapes kind={kind} />
      <Dimension from={from} to={to} label={dimension} />
    </motion.svg>
  );
}
