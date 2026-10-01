import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";

// Procedural textures drawn once on a 2D canvas — no image downloads.

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function finish(canvas: HTMLCanvasElement) {
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return [canvas, canvas.getContext("2d")!] as const;
}

/** Long grain running along U; tiles in both directions. */
export function createGrainTexture() {
  const [canvas, g] = makeCanvas(512, 256);
  const rnd = seeded(11);

  g.fillStyle = "#dbb074";
  g.fillRect(0, 0, 512, 256);

  for (let i = 0; i < 110; i++) {
    const y = rnd() * 256;
    const amplitude = 1.5 + rnd() * 5;
    const phase = rnd() * Math.PI * 2;
    const waves = 1 + Math.floor(rnd() * 3);
    g.strokeStyle =
      rnd() > 0.32
        ? `rgba(146, 92, 44, ${0.1 + rnd() * 0.3})`
        : `rgba(244, 214, 160, ${0.18 + rnd() * 0.3})`;
    g.lineWidth = 0.6 + rnd() * 2.4;

    for (const wrap of [-256, 0, 256]) {
      g.beginPath();
      for (let x = 0; x <= 512; x += 8) {
        const yy =
          y + wrap + Math.sin((x / 512) * Math.PI * 2 * waves + phase) * amplitude;
        if (x === 0) g.moveTo(x, yy);
        else g.lineTo(x, yy);
      }
      g.stroke();
    }
  }

  return finish(canvas);
}

/** The sawn end of a log: growth rings, darker heart, a dab of marking paint. */
export function createRingTexture() {
  const [canvas, g] = makeCanvas(256, 256);
  const rnd = seeded(5);
  const c = 128;

  const base = g.createRadialGradient(c, c, 4, c, c, 128);
  base.addColorStop(0, "#b77f47");
  base.addColorStop(0.45, "#d0a064");
  base.addColorStop(1, "#dfb67c");
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);

  for (let r = 5; r < 126; r += 3 + rnd() * 4.5) {
    g.beginPath();
    for (let a = 0; a <= 64; a++) {
      const angle = (a / 64) * Math.PI * 2;
      const wobble = 1 + Math.sin(angle * 3 + r) * 0.018 + Math.sin(angle * 5) * 0.012;
      const x = c + 6 + Math.cos(angle) * r * wobble;
      const y = c - 4 + Math.sin(angle) * r * wobble;
      if (a === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.strokeStyle = `rgba(122, 74, 36, ${0.25 + rnd() * 0.35})`;
    g.lineWidth = 0.8 + rnd() * 1.6;
    g.stroke();
  }

  // Drying check from the pith outward.
  g.strokeStyle = "rgba(84, 50, 26, 0.75)";
  g.lineWidth = 1.6;
  g.beginPath();
  g.moveTo(c + 8, c - 6);
  g.lineTo(c + 78, c - 52);
  g.stroke();

  // Mill's paint mark.
  g.fillStyle = "rgba(212, 61, 39, 0.92)";
  g.beginPath();
  g.ellipse(84, 168, 24, 19, -0.4, 0, Math.PI * 2);
  g.fill();

  return finish(canvas);
}

/** Bark: dark, with furrows running along the trunk (V). */
export function createBarkTexture() {
  const [canvas, g] = makeCanvas(256, 256);
  const rnd = seeded(23);

  g.fillStyle = "#4b3424";
  g.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 150; i++) {
    const x = rnd() * 256;
    const top = rnd() * 256;
    const length = 30 + rnd() * 120;
    g.strokeStyle =
      rnd() > 0.45
        ? `rgba(28, 18, 12, ${0.25 + rnd() * 0.4})`
        : `rgba(128, 96, 68, ${0.12 + rnd() * 0.25})`;
    g.lineWidth = 1 + rnd() * 3.5;
    g.beginPath();
    g.moveTo(x, top);
    g.bezierCurveTo(
      x + (rnd() - 0.5) * 10,
      top + length * 0.33,
      x + (rnd() - 0.5) * 10,
      top + length * 0.66,
      x + (rnd() - 0.5) * 6,
      top + length,
    );
    g.stroke();
  }

  return finish(canvas);
}
