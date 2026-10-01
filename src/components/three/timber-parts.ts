import { Euler, Quaternion, Vector3 } from "three";

// Every board of the chair, tracked through three poses:
//   inLog   — hidden inside the log before it is sawn
//   onBench — laid out flat as a cut list
//   inChair — its final place in the assembled chair
// A board's own axes are: length on X, thickness on Y, width on Z.

type Triple = [number, number, number];

const FLAT: Triple = [0, 0, 0];
const UPRIGHT: Triple = [0, 0, Math.PI / 2]; // length points up
const DEEP: Triple = [0, Math.PI / 2, 0]; // length runs front to back

// Listed in assembly order: legs, aprons, seat, then the back.
const chair: { size: Triple; pos: Triple; rot: Triple }[] = [
  { size: [0.95, 0.045, 0.045], pos: [-0.2, 0.475, -0.2], rot: UPRIGHT },
  { size: [0.95, 0.045, 0.045], pos: [0.2, 0.475, -0.2], rot: UPRIGHT },
  { size: [0.45, 0.045, 0.045], pos: [-0.2, 0.225, 0.2], rot: UPRIGHT },
  { size: [0.45, 0.045, 0.045], pos: [0.2, 0.225, 0.2], rot: UPRIGHT },
  { size: [0.355, 0.06, 0.022], pos: [0, 0.42, 0.2], rot: FLAT },
  { size: [0.355, 0.06, 0.022], pos: [0, 0.42, -0.2], rot: FLAT },
  { size: [0.355, 0.06, 0.022], pos: [-0.2, 0.42, 0], rot: DEEP },
  { size: [0.355, 0.06, 0.022], pos: [0.2, 0.42, 0], rot: DEEP },
  { size: [0.41, 0.025, 0.1], pos: [-0.165, 0.4625, 0.03], rot: DEEP },
  { size: [0.41, 0.025, 0.1], pos: [-0.055, 0.4625, 0.03], rot: DEEP },
  { size: [0.41, 0.025, 0.1], pos: [0.055, 0.4625, 0.03], rot: DEEP },
  { size: [0.41, 0.025, 0.1], pos: [0.165, 0.4625, 0.03], rot: DEEP },
  { size: [0.355, 0.07, 0.02], pos: [0, 0.62, -0.2], rot: FLAT },
  { size: [0.355, 0.07, 0.02], pos: [0, 0.76, -0.2], rot: FLAT },
  { size: [0.355, 0.07, 0.02], pos: [0, 0.9, -0.2], rot: FLAT },
];

export const LOG = { radius: 0.21, length: 1.02 };

const BENCH_LEFT = -0.475;
const BENCH_GAP = 0.026;

export type Part = {
  size: Triple;
  inLog: Vector3;
  onBench: Vector3;
  benchQuat: Quaternion;
  inChair: Vector3;
  chairQuat: Quaternion;
};

function buildParts(): Part[] {
  const quat = (rot: Triple) => new Quaternion().setFromEuler(new Euler(...rot));

  // Cut list: longest first; short boards sit two to a row.
  const order = chair
    .map((_, i) => i)
    .sort((a, b) => chair[b].size[0] - chair[a].size[0]);

  const rows: number[][] = [];
  for (const index of order) {
    const last = rows[rows.length - 1];
    const isShort = chair[index].size[0] < 0.46;
    if (isShort && last?.length === 1 && chair[last[0]].size[0] < 0.46) {
      last.push(index);
    } else {
      rows.push([index]);
    }
  }

  // Boards lie on their wide face, so thin-but-tall ones are tipped over.
  const footprint = (i: number) => {
    const [, thick, wide] = chair[i].size;
    return thick > wide
      ? { depth: thick, height: wide, tipped: true }
      : { depth: wide, height: thick, tipped: false };
  };

  const rowDepths = rows.map((row) => Math.max(...row.map((i) => footprint(i).depth)));
  const total = rowDepths.reduce((sum, d) => sum + d, 0) + BENCH_GAP * (rows.length - 1);

  const bench = new Map<number, { pos: Vector3; quat: Quaternion }>();
  let z = -total / 2;
  rows.forEach((row, r) => {
    row.forEach((index, column) => {
      const { height, tipped } = footprint(index);
      const length = chair[index].size[0];
      const x = (column === 0 ? BENCH_LEFT : 0.012) + length / 2;
      bench.set(index, {
        pos: new Vector3(x, height / 2, z + rowDepths[r] / 2),
        quat: quat(tipped ? [Math.PI / 2, 0, 0] : FLAT),
      });
    });
    z += rowDepths[r] + BENCH_GAP;
  });

  return chair.map((board, i) => ({
    size: board.size,
    inLog: new Vector3(
      0,
      LOG.radius + (Math.floor(i / 5) - 1) * 0.07,
      ((i % 5) - 2) * 0.05,
    ),
    onBench: bench.get(i)!.pos,
    benchQuat: bench.get(i)!.quat,
    inChair: new Vector3(...board.pos),
    chairQuat: quat(board.rot),
  }));
}

export const PARTS = buildParts();
