"use client";

import React, { useEffect, useRef } from "react";

/**
 * Live-rendered "background video": an endless cinematic camera dolly across an
 * n8n-style workflow canvas. Three depth layers of nodes, bezier connections
 * and glowing data packets that light up nodes as executions run.
 */

type NodeType = "trigger" | "ai" | "logic" | "data" | "app" | "code";

const NODE_LIBRARY: { label: string; type: NodeType }[] = [
  { label: "Webhook", type: "trigger" },
  { label: "Schedule", type: "trigger" },
  { label: "Gmail Trigger", type: "trigger" },
  { label: "Form Submit", type: "trigger" },
  { label: "AI Agent", type: "ai" },
  { label: "Gemini", type: "ai" },
  { label: "OpenAI", type: "ai" },
  { label: "Summarize", type: "ai" },
  { label: "Classify", type: "ai" },
  { label: "IF", type: "logic" },
  { label: "Switch", type: "logic" },
  { label: "Merge", type: "logic" },
  { label: "Wait", type: "logic" },
  { label: "Postgres", type: "data" },
  { label: "Google Sheets", type: "data" },
  { label: "Supabase", type: "data" },
  { label: "Extract PDF", type: "data" },
  { label: "Slack", type: "app" },
  { label: "Gmail", type: "app" },
  { label: "Telegram", type: "app" },
  { label: "Notion", type: "app" },
  { label: "HTTP Request", type: "code" },
  { label: "Code", type: "code" },
  { label: "Set Fields", type: "code" },
];

const TYPE_COLOR: Record<NodeType, [number, number, number]> = {
  trigger: [255, 109, 90],
  ai: [167, 139, 250],
  logic: [251, 191, 36],
  data: [34, 211, 238],
  app: [244, 114, 182],
  code: [52, 211, 153],
};

interface FNode {
  y: number;
  label: string;
  type: NodeType;
  next: number[];
  flash: number;
  ok: number;
}
interface Column {
  x: number;
  nodes: FNode[];
}
interface Layer {
  scale: number;
  speed: number;
  alpha: number;
  offset: number;
  par: number;
  columns: Column[];
}
interface Packet {
  layer: Layer;
  from: Column;
  to: Column;
  fi: number;
  ti: number;
  t: number;
  speed: number;
}

const COL_GAP = 250;
const NODE = 64;

function rand(a: number, b: number) {
  return a + Math.random() * (b - a);
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeColumn(x: number, worldH: number, first: boolean): Column {
  const count = first ? 1 : Math.random() < 0.35 ? 1 : Math.random() < 0.7 ? 2 : 3;
  const nodes: FNode[] = [];
  const band = worldH / (count + 1);
  for (let i = 0; i < count; i++) {
    const def = first ? pick(NODE_LIBRARY.filter((n) => n.type === "trigger")) : pick(NODE_LIBRARY);
    nodes.push({
      y: band * (i + 1) + rand(-band * 0.22, band * 0.22),
      label: def.label,
      type: def.type,
      next: [],
      flash: 0,
      ok: 0,
    });
  }
  return { x, nodes };
}

function linkColumns(a: Column, b: Column) {
  a.nodes.forEach((n) => {
    n.next = [];
  });
  b.nodes.forEach((_, bi) => {
    const src = Math.floor(Math.random() * a.nodes.length);
    if (!a.nodes[src].next.includes(bi)) a.nodes[src].next.push(bi);
  });
  a.nodes.forEach((n) => {
    if (n.next.length === 0) n.next.push(Math.floor(Math.random() * b.nodes.length));
  });
}

function drawIcon(ctx: CanvasRenderingContext2D, type: NodeType, cx: number, cy: number, s: number) {
  ctx.beginPath();
  switch (type) {
    case "trigger": // bolt
      ctx.moveTo(cx + s * 0.1, cy - s * 0.5);
      ctx.lineTo(cx - s * 0.32, cy + s * 0.06);
      ctx.lineTo(cx - s * 0.02, cy + s * 0.06);
      ctx.lineTo(cx - s * 0.1, cy + s * 0.5);
      ctx.lineTo(cx + s * 0.32, cy - s * 0.08);
      ctx.lineTo(cx + s * 0.02, cy - s * 0.08);
      ctx.closePath();
      ctx.fill();
      return;
    case "ai": {
      // 4-point sparkle
      const r = s * 0.5;
      ctx.moveTo(cx, cy - r);
      ctx.quadraticCurveTo(cx, cy, cx + r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + r);
      ctx.quadraticCurveTo(cx, cy, cx - r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - r);
      ctx.fill();
      return;
    }
    case "logic": // diamond
      ctx.moveTo(cx, cy - s * 0.45);
      ctx.lineTo(cx + s * 0.45, cy);
      ctx.lineTo(cx, cy + s * 0.45);
      ctx.lineTo(cx - s * 0.45, cy);
      ctx.closePath();
      ctx.stroke();
      return;
    case "data": // cylinder
      ctx.ellipse(cx, cy - s * 0.28, s * 0.36, s * 0.13, 0, 0, Math.PI * 2);
      ctx.moveTo(cx - s * 0.36, cy - s * 0.28);
      ctx.lineTo(cx - s * 0.36, cy + s * 0.28);
      ctx.ellipse(cx, cy + s * 0.28, s * 0.36, s * 0.13, 0, Math.PI, 0, true);
      ctx.lineTo(cx + s * 0.36, cy - s * 0.28);
      ctx.stroke();
      return;
    case "app": // envelope / window
      ctx.roundRect(cx - s * 0.42, cy - s * 0.3, s * 0.84, s * 0.6, s * 0.08);
      ctx.moveTo(cx - s * 0.42, cy - s * 0.24);
      ctx.lineTo(cx, cy + s * 0.06);
      ctx.lineTo(cx + s * 0.42, cy - s * 0.24);
      ctx.stroke();
      return;
    case "code": // </>
      ctx.moveTo(cx - s * 0.15, cy - s * 0.3);
      ctx.lineTo(cx - s * 0.45, cy);
      ctx.lineTo(cx - s * 0.15, cy + s * 0.3);
      ctx.moveTo(cx + s * 0.15, cy - s * 0.3);
      ctx.lineTo(cx + s * 0.45, cy);
      ctx.lineTo(cx + s * 0.15, cy + s * 0.3);
      ctx.stroke();
      return;
  }
}

export function NeuralFlowCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = false;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let layers: Layer[] = [];
    let packets: Packet[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let pmx = 0;
    let pmy = 0;
    let visible = true;
    let raf = 0;
    let last = performance.now();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const defs = [
        { scale: 0.5, speed: 10, alpha: 0.22, par: 8 },
        { scale: 0.75, speed: 18, alpha: 0.45, par: 18 },
        { scale: 1.05, speed: 30, alpha: 0.9, par: 34 },
      ];
      layers = defs.map((d) => {
        const worldW = W / d.scale + COL_GAP * 3;
        const worldH = H / d.scale;
        const cols: Column[] = [];
        let x = -COL_GAP * 0.5 + rand(0, COL_GAP);
        let first = true;
        while (x < worldW) {
          cols.push(makeColumn(x, worldH, first));
          first = Math.random() < 0.12;
          x += COL_GAP + rand(-30, 40);
        }
        for (let i = 0; i < cols.length - 1; i++) linkColumns(cols[i], cols[i + 1]);
        return { ...d, offset: 0, columns: cols };
      });
      packets = [];
    };

    const spawnPacket = (layer: Layer) => {
      const cols = layer.columns;
      const ci = Math.floor(Math.random() * (cols.length - 1));
      const from = cols[ci];
      const to = cols[ci + 1];
      const fi = Math.floor(Math.random() * from.nodes.length);
      const ti = pick(from.nodes[fi].next);
      if (ti === undefined) return;
      packets.push({ layer, from, to, fi, ti, t: 0, speed: rand(0.55, 0.9) });
    };

    const nodePos = (layer: Layer, col: Column, n: FNode) => {
      const x = (col.x - layer.offset) * layer.scale + pmx * layer.par;
      const y = n.y * layer.scale + pmy * layer.par;
      return { x, y };
    };

    const bez = (x1: number, y1: number, x2: number, y2: number, t: number) => {
      const dx = Math.max(40, (x2 - x1) * 0.5);
      const c1x = x1 + dx, c1y = y1, c2x = x2 - dx, c2y = y2;
      const mt = 1 - t;
      return {
        x: mt * mt * mt * x1 + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * x2,
        y: mt * mt * mt * y1 + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * y2,
      };
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      pmx += (mouseX - pmx) * 0.04;
      pmy += (mouseY - pmy) * 0.04;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      for (const layer of layers) {
        if (!reduced) layer.offset += layer.speed * dt;
        // recycle columns that left the screen
        const cols = layer.columns;
        while (cols.length > 2 && (cols[1].x - layer.offset) * layer.scale < -COL_GAP * layer.scale) {
          const gone = cols.shift()!;
          packets = packets.filter((p) => p.from !== gone && p.to !== gone);
          const lastCol = cols[cols.length - 1];
          const nc = makeColumn(lastCol.x + COL_GAP + rand(-30, 40), H / layer.scale, Math.random() < 0.1);
          linkColumns(lastCol, nc);
          cols.push(nc);
        }

        const a = layer.alpha;
        const s = NODE * layer.scale;
        const r = s * 0.22;

        // connections
        ctx.lineWidth = Math.max(1, 1.6 * layer.scale);
        for (let i = 0; i < cols.length - 1; i++) {
          const c = cols[i];
          const nx = cols[i + 1];
          for (const n of c.nodes) {
            const p1 = nodePos(layer, c, n);
            for (const ti of n.next) {
              const m = nx.nodes[ti];
              if (!m) continue;
              const p2 = nodePos(layer, nx, m);
              const x1 = p1.x + s / 2, x2 = p2.x - s / 2;
              const dx = Math.max(40, (x2 - x1) * 0.5);
              ctx.strokeStyle = `rgba(190,195,230,${0.16 * a})`;
              ctx.beginPath();
              ctx.moveTo(x1, p1.y);
              ctx.bezierCurveTo(x1 + dx, p1.y, x2 - dx, p2.y, x2, p2.y);
              ctx.stroke();
              // ports
              ctx.fillStyle = `rgba(200,205,235,${0.35 * a})`;
              ctx.beginPath();
              ctx.arc(x1, p1.y, 2.6 * layer.scale, 0, Math.PI * 2);
              ctx.arc(x2, p2.y, 2.6 * layer.scale, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // nodes
        for (const c of cols) {
          for (const n of c.nodes) {
            const { x, y } = nodePos(layer, c, n);
            if (x < -s * 2 || x > W + s * 2) continue;
            const [cr, cg, cb] = TYPE_COLOR[n.type];
            n.flash = Math.max(0, n.flash - dt * 1.4);
            n.ok = Math.max(0, n.ok - dt * 0.5);
            const f = n.flash;

            if (f > 0) {
              const g = ctx.createRadialGradient(x, y, 0, x, y, s * 1.6);
              g.addColorStop(0, `rgba(${cr},${cg},${cb},${0.35 * f * a})`);
              g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
              ctx.fillStyle = g;
              ctx.fillRect(x - s * 1.6, y - s * 1.6, s * 3.2, s * 3.2);
            }

            ctx.beginPath();
            if (n.type === "trigger") {
              // n8n trigger nodes: rounded "D" on the left side
              ctx.roundRect(x - s / 2, y - s / 2, s, s, [s / 2, r, r, s / 2]);
            } else {
              ctx.roundRect(x - s / 2, y - s / 2, s, s, r);
            }
            ctx.fillStyle = `rgba(16,17,30,${0.92 * a + 0.05})`;
            ctx.fill();
            ctx.lineWidth = Math.max(1, 1.4 * layer.scale);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(0.35 + f * 0.65) * a})`;
            ctx.stroke();

            // icon
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.75 + f * 0.25) * a})`;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.lineWidth = Math.max(1, 2 * layer.scale);
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            drawIcon(ctx, n.type, x, y, s * 0.42);

            // label
            if (layer.scale > 0.6) {
              ctx.font = `600 ${Math.round(11 * layer.scale)}px Inter, system-ui, sans-serif`;
              ctx.textAlign = "center";
              ctx.fillStyle = `rgba(225,228,245,${0.62 * a})`;
              ctx.fillText(n.label, x, y + s / 2 + 16 * layer.scale);
            }

            // success badge
            if (n.ok > 0) {
              const bx = x + s / 2 - 2, by = y - s / 2 + 2;
              ctx.beginPath();
              ctx.arc(bx, by, 7 * layer.scale, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(52,211,153,${Math.min(1, n.ok * 2) * a})`;
              ctx.fill();
              ctx.strokeStyle = `rgba(6,20,14,${Math.min(1, n.ok * 2) * a})`;
              ctx.lineWidth = 1.6 * layer.scale;
              ctx.beginPath();
              ctx.moveTo(bx - 3 * layer.scale, by);
              ctx.lineTo(bx - 0.5 * layer.scale, by + 2.5 * layer.scale);
              ctx.lineTo(bx + 3.5 * layer.scale, by - 2.5 * layer.scale);
              ctx.stroke();
            }
          }
        }

        // spawn executions
        if (!reduced && Math.random() < dt * (1.2 + layer.scale * 2.2)) spawnPacket(layer);
      }

      // packets
      const keep: Packet[] = [];
      for (const p of packets) {
        p.t += p.speed * dt;
        const L = p.layer;
        const s = NODE * L.scale;
        const a1 = nodePos(L, p.from, p.from.nodes[p.fi]);
        const tn = p.to.nodes[p.ti];
        if (!tn) continue;
        const a2 = nodePos(L, p.to, tn);
        const x1 = a1.x + s / 2, x2 = a2.x - s / 2;
        if (p.t >= 1) {
          tn.flash = 1;
          tn.ok = 1;
          if (Math.random() < 0.75 && tn.next.length) {
            const ci = L.columns.indexOf(p.to);
            if (ci >= 0 && ci < L.columns.length - 1) {
              keep.push({ ...p, from: p.to, to: L.columns[ci + 1], fi: p.ti, ti: pick(tn.next), t: 0 });
            }
          }
          continue;
        }
        const [cr, cg, cb] = TYPE_COLOR[p.from.nodes[p.fi]?.type ?? "trigger"];
        // trail
        for (let k = 8; k >= 0; k--) {
          const tt = Math.max(0, p.t - k * 0.025);
          const q = bez(x1, a1.y, x2, a2.y, tt);
          const fade = (1 - k / 9) * L.alpha;
          ctx.beginPath();
          ctx.arc(q.x, q.y, (k === 0 ? 3.4 : 2.4) * L.scale * (1 - k / 14), 0, Math.PI * 2);
          ctx.fillStyle = k === 0 ? `rgba(255,255,255,${fade})` : `rgba(${cr},${cg},${cb},${fade * 0.7})`;
          ctx.fill();
        }
        const head = bez(x1, a1.y, x2, a2.y, p.t);
        const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 16 * L.scale);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${0.55 * L.alpha})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(head.x - 16 * L.scale, head.y - 16 * L.scale, 32 * L.scale, 32 * L.scale);
        keep.push(p);
      }
      packets = keep.length > 140 ? keep.slice(-140) : keep;
    };

    const onMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * -1;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -1;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);
    const onVis = () => {
      visible = !document.hidden;
    };

    build();
    // pre-warm a few executions so the first frame already feels alive
    for (let i = 0; i < 14; i++) spawnPacket(layers[i % 3]);
    raf = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
