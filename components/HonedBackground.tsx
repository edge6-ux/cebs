'use client';

import { useEffect, useRef } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const LAYERS = [
  { count: 18, speed: 0.08, connectDist: 180, rMin: 1.0, rMax: 1.6, depth: 0.18 },
  { count: 28, speed: 0.20, connectDist: 145, rMin: 1.5, rMax: 2.4, depth: 0.65 },
  { count: 14, speed: 0.36, connectDist: 110, rMin: 2.2, rMax: 3.4, depth: 1.00 },
] as const;

const PARTICLE_COUNT  = 55;
const BG              = '#070b12';
const NODE_RGB        = [0, 212, 160]   as const;
const EDGE_RGB        = [0, 212, 160]   as const;
const PART_RGB        = [26, 143, 255]  as const;
const GLOW_RGB        = [26, 143, 255]  as const;
const ORB_CX          = 0.5;
const ORB_CY          = 0.45;
const ORB_R           = 0.22;
const ORB_PULL        = 0.30;
const CLIP_R_FACTOR   = 0.44;
const FADE_BAND       = 0.14;
const EJECT_LIFESPAN  = 80;
const MAX_EJECTS      = 600;
const SWEEP_DUR       = 110;
const SWEEP_PAUSE     = 220;
const SWEEP_CYCLE     = SWEEP_DUR + SWEEP_PAUSE;
const WAVE_WIDTH      = 0.18;

const EJECT_COLORS = [
  [0, 212, 160], [26, 143, 255], [138, 43, 226],
  [255, 100, 180], [255, 180, 50], [80, 220, 255],
] as const;

const GRAY_COLORS = [
  [210, 212, 215], [195, 197, 200], [220, 220, 224],
  [185, 188, 192], [230, 230, 234], [200, 202, 206],
] as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type RGB = readonly [number, number, number];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number; phase: number;
  ejectCooldown: number;
  palette: typeof EJECT_COLORS | typeof GRAY_COLORS;
}

interface Particle {
  layerIdx: number; fromIdx: number; toIdx: number;
  progress: number; speed: number; size: number;
  opacity: number; targetOpacity: number;
}

interface Eject {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: RGB;
  isGray: boolean; age: number; life: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function rc([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function dist2(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HonedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cast once at declaration so TypeScript doesn't lose the type inside closures
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let W = 0, H = 0, animId = 0, tick = 0;
    let layers: { cfg: typeof LAYERS[number]; nodes: Node[] }[] = [];
    let particles: Particle[] = [];
    let ejects: Eject[] = [];
    let wmPattern: CanvasPattern | null = null;
    let particlesSeeded = false;

    // ── Orb helpers ────────────────────────────────────────────────────────
    const orb = () => ({ ox: W * ORB_CX, oy: H * ORB_CY, orbR: Math.min(W, H) * ORB_R });

    function bentPos(n: Node) {
      const { ox, oy, orbR } = orb();
      const dx = n.x - ox, dy = n.y - oy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const inf = Math.max(0, 1 - d / (orbR * 3.2));
      return { x: n.x - dx * inf * ORB_PULL, y: n.y - dy * inf * ORB_PULL };
    }

    function orbEdgeFade(x: number, y: number) {
      const { ox, oy, orbR } = orb();
      const d = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
      const inner = orbR * CLIP_R_FACTOR, outer = inner * (1 + FADE_BAND);
      if (d < inner) return 0;
      if (d > outer) return 1;
      return (d - inner) / (outer - inner);
    }

    // ── Watermark pattern ──────────────────────────────────────────────────
    function buildPattern() {
      if (!canvas) return null;
      const T = 120, D = 26, OFF = 13;
      const oc = document.createElement('canvas');
      oc.width = T; oc.height = T;
      const c = oc.getContext('2d') as CanvasRenderingContext2D;
      if (!c) return null;
      c.translate(T / 2, T / 2);
      c.rotate(-22 * Math.PI / 180);
      c.strokeStyle = 'rgba(0,212,160,0.07)';
      c.lineWidth = 0.85; c.lineJoin = 'round';
      const diamond = (cx: number, cy: number, h: number, w: number) => {
        c.beginPath(); c.moveTo(cx, cy - h); c.lineTo(cx + w, cy);
        c.lineTo(cx, cy + h); c.lineTo(cx - w, cy); c.closePath(); c.stroke();
      };
      diamond(-OFF, 0, D, D * 0.80);
      diamond(+OFF, 0, D, D * 0.80);
      c.beginPath(); c.arc(0, 0, 1.2, 0, Math.PI * 2);
      c.fillStyle = 'rgba(0,212,160,0.09)'; c.fill();
      return ctx.createPattern(oc, 'repeat');
    }

    // ── Init ───────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      wmPattern = buildPattern();
      initLayers();
      if (!particlesSeeded) { initParticles(); particlesSeeded = true; }
      ejects = [];
    }

    function initLayers() {
      layers = LAYERS.map(cfg => ({
        cfg,
        nodes: Array.from({ length: cfg.count }, (): Node => ({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed,
          r: cfg.rMin + Math.random() * (cfg.rMax - cfg.rMin),
          phase: Math.random() * Math.PI * 2,
          ejectCooldown: Math.random() * 80,
          palette: Math.random() < 0.5 ? EJECT_COLORS : GRAY_COLORS,
        })),
      }));
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, (): Particle => ({
        layerIdx: Math.floor(Math.random() * LAYERS.length),
        fromIdx: -1, toIdx: -1,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 1.2 + Math.random() * 1.4,
        opacity: Math.random() * 0.5,
        targetOpacity: 0,
      }));
    }

    function buildAdj(nodes: Node[], cd: number) {
      const d2 = cd * cd;
      const adj: number[][] = Array.from({ length: nodes.length }, () => []);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++)
          if (dist2(nodes[i], nodes[j]) < d2) { adj[i].push(j); adj[j].push(i); }
      return adj;
    }

    function assignParticle(p: Particle, allAdj: number[][][]) {
      for (let a = 0; a < 30; a++) {
        const li   = Math.floor(Math.random() * layers.length);
        const adj  = allAdj[li];
        const from = Math.floor(Math.random() * layers[li].nodes.length);
        if (adj[from]?.length > 0) {
          p.layerIdx = li; p.fromIdx = from;
          p.toIdx = adj[from][Math.floor(Math.random() * adj[from].length)];
          p.progress = 0;
          p.targetOpacity = (0.7 + Math.random() * 0.3) * layers[li].cfg.depth;
          return true;
        }
      }
      return false;
    }

    function spawnEject(x: number, y: number, pal: typeof EJECT_COLORS | typeof GRAY_COLORS) {
      if (ejects.length >= MAX_EJECTS) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.8 + Math.random() * 3.2;
      const color = pal[Math.floor(Math.random() * pal.length)] as RGB;
      const isGray = (pal as unknown) === (GRAY_COLORS as unknown);
      ejects.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        r: 0.4 + Math.random() * 0.8, color, isGray, age: 0,
        life: EJECT_LIFESPAN * (0.7 + Math.random() * 0.6),
      });
    }

    // ── Draw passes ────────────────────────────────────────────────────────
    function drawAtmosphere() {
      if (!canvas) return;
      const cx = W * 0.5, cy = H * 0.42;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.52);
      g.addColorStop(0, 'rgba(0,28,22,0.55)');
      g.addColorStop(0.55, 'rgba(3,10,20,0.38)');
      g.addColorStop(1, 'rgba(7,11,18,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    function drawWatermark() {
      if (!canvas || !wmPattern) return;
      ctx.fillStyle = wmPattern; ctx.fillRect(0, 0, W, H);
    }

    function drawOrb() {
      if (!canvas) return;
      const { ox, oy, orbR } = orb();
      const ap = tick * 0.008;
      for (let i = 0; i < 3; i++) {
        const angle = ap + i * (Math.PI * 2 / 3);
        const ar = orbR * (1.65 + 0.12 * Math.sin(ap * 0.7 + i));
        const aurora = ctx.createRadialGradient(
          ox + Math.cos(angle) * orbR * 0.18, oy + Math.sin(angle) * orbR * 0.12, orbR * 0.38,
          ox, oy, ar);
        aurora.addColorStop(0, 'rgba(0,0,0,0)');
        aurora.addColorStop(0.35, 'rgba(0,48,28,0.11)');
        aurora.addColorStop(0.60, 'rgba(0,68,34,0.07)');
        aurora.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(ox, oy, ar, 0, Math.PI * 2);
        ctx.fillStyle = aurora; ctx.fill();
      }
      const s = ctx.createRadialGradient(ox, oy, orbR * 0.55, ox, oy, orbR * 3.0);
      s.addColorStop(0, 'rgba(2,5,9,0.50)'); s.addColorStop(0.25, 'rgba(3,6,11,0.28)');
      s.addColorStop(0.55, 'rgba(5,8,14,0.12)'); s.addColorStop(1, 'rgba(7,11,18,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 3.0, 0, Math.PI * 2); ctx.fillStyle = s; ctx.fill();

      const m = ctx.createRadialGradient(ox, oy, orbR * 0.28, ox, oy, orbR * 1.10);
      m.addColorStop(0, 'rgba(2,4,8,0.82)'); m.addColorStop(0.30, 'rgba(3,5,10,0.65)');
      m.addColorStop(0.55, 'rgba(4,7,13,0.38)'); m.addColorStop(0.78, 'rgba(6,9,15,0.16)');
      m.addColorStop(1, 'rgba(7,11,18,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 1.10, 0, Math.PI * 2); ctx.fillStyle = m; ctx.fill();

      const co = ctx.createRadialGradient(ox, oy, 0, ox, oy, orbR * 0.52);
      co.addColorStop(0, 'rgba(1,2,4,0.96)'); co.addColorStop(0.50, 'rgba(2,4,7,0.90)');
      co.addColorStop(0.82, 'rgba(3,6,10,0.72)'); co.addColorStop(1, 'rgba(5,8,13,0.30)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 0.52, 0, Math.PI * 2); ctx.fillStyle = co; ctx.fill();

      const rp = 0.5 + 0.5 * Math.sin(tick * 0.022);
      const rim = ctx.createRadialGradient(ox, oy, orbR * 0.38, ox, oy, orbR * 0.56);
      rim.addColorStop(0, 'rgba(0,212,160,0)');
      rim.addColorStop(0.55, `rgba(0,212,160,${(0.03 + 0.018 * rp).toFixed(3)})`);
      rim.addColorStop(1, 'rgba(0,212,160,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 0.56, 0, Math.PI * 2); ctx.fillStyle = rim; ctx.fill();
    }

    function drawVignette() {
      if (!canvas) return;
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.22, W / 2, H / 2, H * 0.85);
      g.addColorStop(0, 'rgba(7,11,18,0)'); g.addColorStop(1, 'rgba(7,11,18,0.80)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    function drawLift() {
      if (!canvas) return;
      const phase = (tick % SWEEP_CYCLE) / SWEEP_CYCLE;
      if (phase > SWEEP_DUR / SWEEP_CYCLE) return;
      const sweepT = phase / (SWEEP_DUR / SWEEP_CYCLE);
      const diag   = W + H;
      const front  = (sweepT * (1 + WAVE_WIDTH) - WAVE_WIDTH) * diag;
      const waveW  = WAVE_WIDTH * diag;
      const INV_S  = 1 / Math.SQRT2;
      const half   = front * 0.5;

      // Brightness envelope: 1.0 at start, ~0.5 at midpoint, ~0 at end
      const brightness = Math.pow(Math.max(0, 1 - sweepT), 1.5);

      // Lifted shadow region
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.min(front, W), 0);
      if (front > W) ctx.lineTo(W, front - W);
      ctx.lineTo(Math.max(0, front - H), H);
      ctx.lineTo(0, H);
      ctx.closePath();
      ctx.clip();
      const lg = ctx.createLinearGradient(0, 0, W, H);
      lg.addColorStop(0, `rgba(0,0,0,${(0.60 * brightness).toFixed(3)})`);
      lg.addColorStop(Math.min(sweepT * 1.1, 0.98), `rgba(0,0,0,${(0.20 * brightness).toFixed(3)})`);
      lg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
      const tg = ctx.createLinearGradient(0, 0, W, H);
      tg.addColorStop(0, `rgba(10,20,60,${(0.32 * brightness).toFixed(3)})`);
      tg.addColorStop(Math.min(sweepT * 1.1, 0.98), `rgba(10,20,60,${(0.08 * brightness).toFixed(3)})`);
      tg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = tg; ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Chromatic wave crest
      const wg = ctx.createLinearGradient(
        half - INV_S * waveW * 0.5, half - INV_S * waveW * 0.5,
        half + INV_S * waveW * 0.5, half + INV_S * waveW * 0.5);
      wg.addColorStop(0.00, 'rgba(0,0,0,0)');
      wg.addColorStop(0.28, `rgba(0,212,160,${(0.04 * brightness).toFixed(3)})`);
      wg.addColorStop(0.44, `rgba(0,212,160,${(0.28 * brightness).toFixed(3)})`);
      wg.addColorStop(0.52, `rgba(160,80,255,${(0.65 * brightness).toFixed(3)})`);
      wg.addColorStop(0.60, `rgba(26,143,255,${(0.35 * brightness).toFixed(3)})`);
      wg.addColorStop(0.74, `rgba(26,143,255,${(0.06 * brightness).toFixed(3)})`);
      wg.addColorStop(1.00, 'rgba(0,0,0,0)');
      ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);

      // Hard bright leading edge
      const eg = ctx.createLinearGradient(
        half - INV_S * 10, half - INV_S * 10,
        half + INV_S * 10, half + INV_S * 10);
      eg.addColorStop(0.00, 'rgba(0,212,160,0)');
      eg.addColorStop(0.44, 'rgba(0,212,160,0)');
      eg.addColorStop(0.50, `rgba(200,255,245,${(0.75 * brightness).toFixed(3)})`);
      eg.addColorStop(0.56, `rgba(138,80,255,${(0.30 * brightness).toFixed(3)})`);
      eg.addColorStop(1.00, 'rgba(0,0,0,0)');
      ctx.fillStyle = eg; ctx.fillRect(0, 0, W, H);
    }

    // ── Main loop ──────────────────────────────────────────────────────────
    function render() {
      if (!canvas) return;
      animId = requestAnimationFrame(render);
      tick++;

      ctx.fillStyle = BG; ctx.fillRect(0, 0, W, H);
      drawAtmosphere();
      drawWatermark();

      const allAdj = layers.map(l => buildAdj(l.nodes, l.cfg.connectDist));

      layers.forEach((layer, li) => {
        const { nodes, cfg } = layer;
        const adj = allAdj[li];
        const d = cfg.connectDist, da = cfg.depth;

        nodes.forEach(n => {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -30)  { n.x = -30;  n.vx =  Math.abs(n.vx); }
          if (n.x > W+30) { n.x = W+30; n.vx = -Math.abs(n.vx); }
          if (n.y < -30)  { n.y = -30;  n.vy =  Math.abs(n.vy); }
          if (n.y > H+30) { n.y = H+30; n.vy = -Math.abs(n.vy); }
          if (li >= 1) {
            n.ejectCooldown--;
            if (n.ejectCooldown <= 0) {
              const bp = bentPos(n);
              if (orbEdgeFade(bp.x, bp.y) > 0.3) {
                const ct = 1 + Math.floor(Math.random() * 3);
                for (let e = 0; e < ct; e++) spawnEject(bp.x, bp.y, n.palette);
              }
              n.ejectCooldown = li === 2
                ? 18 + Math.floor(Math.random() * 28)
                : 45 + Math.floor(Math.random() * 55);
            }
          }
        });

        // Edges
        for (let i = 0; i < nodes.length; i++) {
          for (let k = 0; k < adj[i].length; k++) {
            const j = adj[i][k]; if (j <= i) continue;
            const bi = bentPos(nodes[i]), bj = bentPos(nodes[j]);
            const fi = orbEdgeFade(bi.x, bi.y), fj = orbEdgeFade(bj.x, bj.y);
            const ef = Math.min(fi, fj); if (ef <= 0) continue;
            const dx = bi.x - bj.x, dy = bi.y - bj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = 1 - dist / d, alpha = da * 0.22 * t * t * t * ef;
            if (li === 2) {
              const g = ctx.createLinearGradient(bi.x, bi.y, bj.x, bj.y);
              g.addColorStop(0,   rc(EDGE_RGB, alpha * 1.4));
              g.addColorStop(0.5, rc(EDGE_RGB, alpha * 0.7));
              g.addColorStop(1,   rc(EDGE_RGB, alpha * 1.4));
              ctx.beginPath(); ctx.moveTo(bi.x, bi.y); ctx.lineTo(bj.x, bj.y);
              ctx.strokeStyle = g; ctx.lineWidth = 0.7; ctx.stroke();
            } else {
              ctx.beginPath(); ctx.moveTo(bi.x, bi.y); ctx.lineTo(bj.x, bj.y);
              ctx.strokeStyle = rc(EDGE_RGB, alpha); ctx.lineWidth = 0.4; ctx.stroke();
            }
          }
        }

        // Nodes
        nodes.forEach(n => {
          const bp = bentPos(n), fade = orbEdgeFade(bp.x, bp.y);
          if (fade <= 0) return;
          const pulse = 0.5 + 0.5 * Math.sin(tick * 0.016 + n.phase);
          const r = n.r * (0.9 + 0.1 * pulse), baseA = da * (0.45 + 0.3 * pulse) * fade;
          if (li === 2) {
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 7, 0, Math.PI * 2);
            ctx.fillStyle = rc(NODE_RGB, (0.03 + 0.02 * pulse) * fade); ctx.fill();
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 3.5, 0, Math.PI * 2);
            ctx.fillStyle = rc(NODE_RGB, (0.06 + 0.04 * pulse) * fade); ctx.fill();
          } else {
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 3, 0, Math.PI * 2);
            ctx.fillStyle = rc(NODE_RGB, 0.03 * da * fade); ctx.fill();
          }
          ctx.beginPath(); ctx.arc(bp.x, bp.y, r, 0, Math.PI * 2);
          ctx.fillStyle = rc(NODE_RGB, baseA); ctx.fill();
        });
      });

      // Network particles
      particles.forEach(p => {
        const layer = layers[p.layerIdx];
        const adj   = allAdj[p.layerIdx];
        const d2    = layer.cfg.connectDist * layer.cfg.connectDist;
        const valid = p.fromIdx >= 0 && p.toIdx >= 0
          && adj[p.fromIdx]?.includes(p.toIdx)
          && dist2(layer.nodes[p.fromIdx], layer.nodes[p.toIdx]) < d2;
        if (!valid || p.progress >= 1) { assignParticle(p, allAdj); return; }
        p.progress += p.speed;
        const fi = Math.min(p.progress / 0.1, 1), fo = Math.min((1 - p.progress) / 0.1, 1);
        p.opacity += (p.targetOpacity * fi * fo - p.opacity) * 0.08;
        const ns = layer.nodes;
        const ba = bentPos(ns[p.fromIdx]), bb = bentPos(ns[p.toIdx]);
        const px = ba.x + (bb.x - ba.x) * p.progress, py = ba.y + (bb.y - ba.y) * p.progress;
        const of = orbEdgeFade(px, py); if (of <= 0) return;
        const tp = Math.max(0, p.progress - 0.09);
        const tx = ba.x + (bb.x - ba.x) * tp, ty = ba.y + (bb.y - ba.y) * tp;
        const ef = Math.min(of, orbEdgeFade(tx, ty));
        const g = ctx.createLinearGradient(tx, ty, px, py);
        g.addColorStop(0, rc(PART_RGB, 0)); g.addColorStop(1, rc(PART_RGB, p.opacity * 0.8 * ef));
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py);
        ctx.strokeStyle = g; ctx.lineWidth = p.size; ctx.lineCap = 'round'; ctx.stroke();
        if (p.layerIdx === 2) {
          ctx.beginPath(); ctx.arc(px, py, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = rc(GLOW_RGB, p.opacity * 0.12 * of); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(px, py, p.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = rc(PART_RGB, p.opacity * of); ctx.fill();
      });

      // Ejected dots
      ejects = ejects.filter(e => e.age < e.life);
      ejects.forEach(e => {
        e.x += e.vx; e.y += e.vy;
        const drag = e.age < 12 ? 0.82 : 0.94;
        e.vx *= drag; e.vy *= drag; e.age++;
        const t = e.age / e.life;
        const fi = Math.min(e.age / 5, 1);
        const fo = t > 0.35 ? Math.pow(1 - (t - 0.35) / 0.65, 1.6) : 1;
        const pa = e.isGray ? 0.95 : 0.80, alpha = pa * fi * fo;
        const of = orbEdgeFade(e.x, e.y); if (of <= 0) return;
        const hr = e.isGray ? e.r + 2.5 : e.r + 1.5, ha = e.isGray ? 0.28 : 0.18;
        ctx.beginPath(); ctx.arc(e.x, e.y, hr, 0, Math.PI * 2);
        ctx.fillStyle = rc(e.color, alpha * ha * of); ctx.fill();
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = rc(e.color, alpha * of); ctx.fill();
      });

      // Draw order: orb → vignette → lift (wave always on top)
      drawOrb();
      drawVignette();
      drawLift();
    }

    // ── Start ──────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(animId);
      resize();
      render();
    });
    ro.observe(canvas);
    resize();
    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
