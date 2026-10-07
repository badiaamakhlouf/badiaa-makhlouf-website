// Pure layout maths for architecture diagrams, shared by the interactive
// diagram (client) and the static thumbnails (server).
import type { ArchNode } from "@/content/projects";

// Grid geometry in diagram units (rendered responsively via percentages).
export const COL_W = 184;
export const ROW_H = 118;
export const NODE_W = 144;
export const NODE_H = 64;
export const PAD = 16;

type Point = { x: number; y: number };

export function geometry(nodes: ArchNode[]) {
  const maxCol = Math.max(...nodes.map((n) => n.col));
  const maxRow = Math.max(...nodes.map((n) => n.row));
  return {
    width: PAD * 2 + maxCol * COL_W + NODE_W,
    height: PAD * 2 + maxRow * ROW_H + NODE_H,
  };
}

export const left = (n: ArchNode) => PAD + n.col * COL_W;
export const top = (n: ArchNode) => PAD + n.row * ROW_H;
export const cx = (n: ArchNode) => left(n) + NODE_W / 2;
export const cy = (n: ArchNode) => top(n) + NODE_H / 2;

/** Routes an edge and returns its SVG path plus a point to anchor its label. */
export function route(a: ArchNode, b: ArchNode): { d: string; label: Point } {
  const dCol = b.col - a.col;

  // Long edge arriving from below-left: run along the source row, then rise into the target's bottom.
  if (dCol > 1 && b.row < a.row) {
    const x1 = left(a) + NODE_W;
    const y1 = cy(a);
    const x2 = cx(b);
    const y2 = top(b) + NODE_H;
    const r = 14;
    return {
      d: `M ${x1} ${y1} H ${x2 - r} Q ${x2} ${y1} ${x2} ${y1 - r} V ${y2}`,
      label: { x: (x1 + x2) / 2, y: y1 - 8 },
    };
  }

  // Same column (or nearly): vertical connector.
  if (Math.abs(dCol) < 0.75) {
    const down = b.row > a.row;
    const x1 = cx(a);
    const y1 = down ? top(a) + NODE_H : top(a);
    const x2 = cx(b);
    const y2 = down ? top(b) : top(b) + NODE_H;
    const my = (y1 + y2) / 2;
    return {
      d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
      label: { x: (x1 + x2) / 2 + 8, y: my },
    };
  }

  // Backward edge (feedback loop): dip below both nodes.
  if (dCol < 0) {
    const x1 = cx(a) - 28;
    const x2 = cx(b) + 28;
    const y = top(a) + NODE_H;
    const dip = y + 44;
    return {
      d: `M ${x1} ${y} C ${x1} ${dip}, ${x2} ${dip}, ${x2} ${y}`,
      label: { x: (x1 + x2) / 2, y: dip - 2 },
    };
  }

  // Forward edge: right side of source → left side of target.
  const x1 = left(a) + NODE_W;
  const y1 = cy(a);
  const x2 = left(b);
  const y2 = cy(b);
  const c = Math.max(24, (x2 - x1) / 2);
  return {
    d: `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`,
    label: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 - 8 },
  };
}
