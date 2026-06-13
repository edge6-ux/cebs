'use client';

import { useEffect, useRef } from 'react';

const LAYERS = [
  { count: 18, speed: 0.08, connectDist: 180, rMin: 1.0, rMax: 1.6, depth: 0.18 },
  { count: 28, speed: 0.20, connectDist: 145, rMin: 1.5, rMax: 2.4, depth: 0.65 },
  { count: 14, speed: 0.36, connectDist: 110, rMin: 2.2, rMax: 3.4, depth: 1.00 },
];

const PARTICLE_COUNT = 55;
const BG            = '#070b12';
const NODE_RGB      = [0, 212, 160]  as const;
const EDGE_RGB      = [0, 212, 160]  as const;
const PART_RGB      = [26, 143, 255] as const;
const GLOW_RGB      = [26, 143, 255] as const;
const ORB_CX        = 0.5;
const ORB_CY        = 0.45;
const ORB_R         = 0.22;
const ORB_PULL      = 0.30;
const CLIP_R_FACTOR = 0.44;
const FADE_BAND     = 0.14;
const EJECT_LIFESPAN = 80;
const MAX_EJECTS    = 600;

const EJECT_COLORS = [
  [0, 212, 160], [26, 143, 255], [138, 43, 226],
  [255, 100, 180], [255, 180, 50], [80, 220, 255],
] as const;

const GRAY_COLORS = [
  [210, 212, 215], [195, 197, 200], [220, 220, 224],
  [185, 188, 192], [230, 230, 234], [200, 202, 206],
] as const;

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

interface Layer {
  cfg: typeof LAYERS[number];
  nodes: Node[];
}

function rgbaStr([r, g, b]: RGB, a: number) {
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function dist2(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x, dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export default function HonedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    let W = 0, H = 0;
    let animId = 0, tick = 0;
    let layers: Layer[] = [];
    let particles: Particle[] = [];
    let ejects: Eject[] = [];

    // ── Orb helpers ──────────────────────────────────────────
    function orbCenter() {
      return { ox: W * ORB_CX, oy: H * ORB_CY, orbR: Math.min(W, H) * ORB_R };
    }

    function bentPos(node: Node) {
      const { ox, oy, orbR } = orbCenter();
      const dx = node.x - ox, dy = node.y - oy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - d / (orbR * 3.2));
      return { x: node.x - dx * influence * ORB_PULL, y: node.y - dy * influence * ORB_PULL };
    }

    function orbEdgeFade(x: number, y: number) {
      const { ox, oy, orbR } = orbCenter();
      const d = Math.sqrt((x - ox) ** 2 + (y - oy) ** 2);
      const inner = orbR * CLIP_R_FACTOR, outer = inner * (1 + FADE_BAND);
      if (d < inner) return 0;
      if (d > outer) return 1;
      return (d - inner) / (outer - inner);
    }

    // ── Init ─────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initLayers();
      initParticles();
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
          ejectCooldown: Math.random() * 60,
          palette: Math.random() < 0.5 ? EJECT_COLORS : GRAY_COLORS,
        })),
      }));
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, (): Particle => ({
        layerIdx: 0, fromIdx: -1, toIdx: -1,
        progress: Math.random(), speed: 0.002 + Math.random() * 0.003,
        size: 1.2 + Math.random() * 1.4, opacity: 0, targetOpacity: 0,
      }));
    }

    function buildAdj(nodes: Node[], connectDist: number) {
      const d2 = connectDist * connectDist;
      const adj: number[][] = Array.from({ length: nodes.length }, () => []);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++)
          if (dist2(nodes[i], nodes[j]) < d2) { adj[i].push(j); adj[j].push(i); }
      return adj;
    }

    function assignParticle(p: Particle, allAdj: number[][][]) {
      for (let attempt = 0; attempt < 30; attempt++) {
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

    function spawnEject(x: number, y: number, palette: typeof EJECT_COLORS | typeof GRAY_COLORS) {
      if (ejects.length >= MAX_EJECTS) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.8 + Math.random() * 3.2;
      const color = palette[Math.floor(Math.random() * palette.length)] as RGB;
      const isGray = (palette as unknown) === (GRAY_COLORS as unknown);
      ejects.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        r: 0.4 + Math.random() * 0.8, color, isGray, age: 0,
        life: EJECT_LIFESPAN * (0.7 + Math.random() * 0.6) });
    }

    // ── Draw passes ──────────────────────────────────────────
    function drawAtmosphere() {
      const cx = W * 0.5, cy = H * 0.42;
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.52);
      g1.addColorStop(0, 'rgba(0,28,22,0.55)');
      g1.addColorStop(0.55, 'rgba(3,10,20,0.38)');
      g1.addColorStop(1, 'rgba(7,11,18,0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);
    }

    function drawOrb() {
      const { ox, oy, orbR } = orbCenter();
      const ap = tick * 0.008;

      // Aurora blooms
      for (let i = 0; i < 3; i++) {
        const angle = ap + i * (Math.PI * 2 / 3);
        const ar = orbR * (1.65 + 0.12 * Math.sin(ap * 0.7 + i));
        const aurora = ctx.createRadialGradient(
          ox + Math.cos(angle) * orbR * 0.18, oy + Math.sin(angle) * orbR * 0.12, orbR * 0.38,
          ox, oy, ar,
        );
        aurora.addColorStop(0,    'rgba(0,0,0,0)');
        aurora.addColorStop(0.35, 'rgba(0,48,28,0.11)');
        aurora.addColorStop(0.60, 'rgba(0,68,34,0.07)');
        aurora.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(ox, oy, ar, 0, Math.PI * 2);
        ctx.fillStyle = aurora; ctx.fill();
      }

      // Outer suppressor
      const suppress = ctx.createRadialGradient(ox, oy, orbR * 0.55, ox, oy, orbR * 3.0);
      suppress.addColorStop(0,    'rgba(2,5,9,0.50)');
      suppress.addColorStop(0.25, 'rgba(3,6,11,0.28)');
      suppress.addColorStop(0.55, 'rgba(5,8,14,0.12)');
      suppress.addColorStop(1,    'rgba(7,11,18,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 3.0, 0, Math.PI * 2);
      ctx.fillStyle = suppress; ctx.fill();

      // Penumbra
      const mid = ctx.createRadialGradient(ox, oy, orbR * 0.28, ox, oy, orbR * 1.10);
      mid.addColorStop(0,    'rgba(2,4,8,0.82)');
      mid.addColorStop(0.30, 'rgba(3,5,10,0.65)');
      mid.addColorStop(0.55, 'rgba(4,7,13,0.38)');
      mid.addColorStop(0.78, 'rgba(6,9,15,0.16)');
      mid.addColorStop(1,    'rgba(7,11,18,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 1.10, 0, Math.PI * 2);
      ctx.fillStyle = mid; ctx.fill();

      // Core
      const core = ctx.createRadialGradient(ox, oy, 0, ox, oy, orbR * 0.52);
      core.addColorStop(0,    'rgba(1,2,4,0.96)');
      core.addColorStop(0.50, 'rgba(2,4,7,0.90)');
      core.addColorStop(0.82, 'rgba(3,6,10,0.72)');
      core.addColorStop(1,    'rgba(5,8,13,0.30)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 0.52, 0, Math.PI * 2);
      ctx.fillStyle = core; ctx.fill();

      // Teal rim
      const rimPulse = 0.5 + 0.5 * Math.sin(tick * 0.022);
      const rim = ctx.createRadialGradient(ox, oy, orbR * 0.38, ox, oy, orbR * 0.56);
      rim.addColorStop(0,    'rgba(0,212,160,0)');
      rim.addColorStop(0.55, `rgba(0,212,160,${(0.03 + 0.018 * rimPulse).toFixed(3)})`);
      rim.addColorStop(1,    'rgba(0,212,160,0)');
      ctx.beginPath(); ctx.arc(ox, oy, orbR * 0.56, 0, Math.PI * 2);
      ctx.fillStyle = rim; ctx.fill();
    }

    function drawVignette() {
      const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.22, W / 2, H / 2, H * 0.85);
      g.addColorStop(0, 'rgba(7,11,18,0)');
      g.addColorStop(1, 'rgba(7,11,18,0.80)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    }

    // ── Main loop ────────────────────────────────────────────
    function render() {
      animId = requestAnimationFrame(render);
      tick++;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      drawAtmosphere();

      const allAdj = layers.map(l => buildAdj(l.nodes, l.cfg.connectDist));

      layers.forEach((layer, li) => {
        const { nodes, cfg } = layer;
        const adj = allAdj[li];
        const d = cfg.connectDist, depthAlpha = cfg.depth;

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
                const count = 1 + Math.floor(Math.random() * 3);
                for (let e = 0; e < count; e++) spawnEject(bp.x, bp.y, n.palette);
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
            const edgeFade = Math.min(fi, fj); if (edgeFade <= 0) continue;
            const dx = bi.x - bj.x, dy = bi.y - bj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = 1 - dist / d;
            const alpha = depthAlpha * 0.22 * t * t * t * edgeFade;
            if (li === 2) {
              const grd = ctx.createLinearGradient(bi.x, bi.y, bj.x, bj.y);
              grd.addColorStop(0,   rgbaStr(EDGE_RGB, alpha * 1.4));
              grd.addColorStop(0.5, rgbaStr(EDGE_RGB, alpha * 0.7));
              grd.addColorStop(1,   rgbaStr(EDGE_RGB, alpha * 1.4));
              ctx.beginPath(); ctx.moveTo(bi.x, bi.y); ctx.lineTo(bj.x, bj.y);
              ctx.strokeStyle = grd; ctx.lineWidth = 0.7; ctx.stroke();
            } else {
              ctx.beginPath(); ctx.moveTo(bi.x, bi.y); ctx.lineTo(bj.x, bj.y);
              ctx.strokeStyle = rgbaStr(EDGE_RGB, alpha); ctx.lineWidth = 0.4; ctx.stroke();
            }
          }
        }

        // Nodes
        nodes.forEach(n => {
          const bp = bentPos(n);
          const fade = orbEdgeFade(bp.x, bp.y); if (fade <= 0) return;
          const pulse = 0.5 + 0.5 * Math.sin(tick * 0.016 + n.phase);
          const r = n.r * (0.9 + 0.1 * pulse);
          const baseA = depthAlpha * (0.45 + 0.3 * pulse) * fade;
          if (li === 2) {
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 7, 0, Math.PI * 2);
            ctx.fillStyle = rgbaStr(NODE_RGB, (0.03 + 0.02 * pulse) * fade); ctx.fill();
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 3.5, 0, Math.PI * 2);
            ctx.fillStyle = rgbaStr(NODE_RGB, (0.06 + 0.04 * pulse) * fade); ctx.fill();
          } else {
            ctx.beginPath(); ctx.arc(bp.x, bp.y, r + 3, 0, Math.PI * 2);
            ctx.fillStyle = rgbaStr(NODE_RGB, 0.03 * depthAlpha * fade); ctx.fill();
          }
          ctx.beginPath(); ctx.arc(bp.x, bp.y, r, 0, Math.PI * 2);
          ctx.fillStyle = rgbaStr(NODE_RGB, baseA); ctx.fill();
        });
      });

      // Network particles
      particles.forEach(p => {
        const layer = layers[p.layerIdx];
        const adj   = allAdj[p.layerIdx];
        const d2    = layer.cfg.connectDist * layer.cfg.connectDist;
        const edgeValid = p.fromIdx >= 0 && p.toIdx >= 0
          && adj[p.fromIdx]?.includes(p.toIdx)
          && dist2(layer.nodes[p.fromIdx], layer.nodes[p.toIdx]) < d2;
        if (!edgeValid || p.progress >= 1) {
          if (p.opacity > 0.008) { p.opacity *= 0.78; return; }
          p.opacity = 0; assignParticle(p, allAdj); return;
        }
        p.progress += p.speed;
        const fadeIn  = Math.min(p.progress / 0.1, 1);
        const fadeOut = Math.min((1 - p.progress) / 0.1, 1);
        p.opacity += (p.targetOpacity * fadeIn * fadeOut - p.opacity) * 0.1;
        const ns = layer.nodes;
        const ba = bentPos(ns[p.fromIdx]), bb = bentPos(ns[p.toIdx]);
        const px = ba.x + (bb.x - ba.x) * p.progress;
        const py = ba.y + (bb.y - ba.y) * p.progress;
        const orbFade = orbEdgeFade(px, py); if (orbFade <= 0) return;
        const trailProg = Math.max(0, p.progress - 0.09);
        const tx = ba.x + (bb.x - ba.x) * trailProg;
        const ty = ba.y + (bb.y - ba.y) * trailProg;
        const effectiveFade = Math.min(orbFade, orbEdgeFade(tx, ty));
        const grd = ctx.createLinearGradient(tx, ty, px, py);
        grd.addColorStop(0, rgbaStr(PART_RGB, 0));
        grd.addColorStop(1, rgbaStr(PART_RGB, p.opacity * 0.8 * effectiveFade));
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py);
        ctx.strokeStyle = grd; ctx.lineWidth = p.size; ctx.lineCap = 'round'; ctx.stroke();
        if (p.layerIdx === 2) {
          ctx.beginPath(); ctx.arc(px, py, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = rgbaStr(GLOW_RGB, p.opacity * 0.12 * orbFade); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(px, py, p.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(PART_RGB, p.opacity * orbFade); ctx.fill();
      });

      // Ejected dots
      ejects = ejects.filter(e => e.age < e.life);
      ejects.forEach(e => {
        e.x += e.vx; e.y += e.vy;
        const drag = e.age < 12 ? 0.82 : 0.94;
        e.vx *= drag; e.vy *= drag;
        e.age++;
        const t       = e.age / e.life;
        const fadeIn  = Math.min(e.age / 5, 1);
        const fadeOut = t > 0.35 ? Math.pow(1 - (t - 0.35) / 0.65, 1.6) : 1;
        const peakAlpha = e.isGray ? 0.95 : 0.80;
        const alpha   = peakAlpha * fadeIn * fadeOut;
        const orbFade = orbEdgeFade(e.x, e.y);
        if (orbFade <= 0) return;
        const haloR = e.isGray ? e.r + 2.5 : e.r + 1.5;
        const haloA = e.isGray ? 0.28 : 0.18;
        ctx.beginPath(); ctx.arc(e.x, e.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(e.color, alpha * haloA * orbFade); ctx.fill();
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = rgbaStr(e.color, alpha * orbFade); ctx.fill();
      });

      drawOrb();
      drawVignette();
    }

    // ── Start ────────────────────────────────────────────────
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
