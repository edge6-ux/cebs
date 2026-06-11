'use client';

import { useEffect, useRef } from 'react';

const CFG = {
  nodeCount: 48,
  connectDist: 155,
  nodeSpeed: 0.22,
  particleCount: 50,
  bgColor: '#070b12',
  nodeColor:     [0, 212, 160] as [number, number, number],
  edgeColor:     [0, 212, 160] as [number, number, number],
  particleColor: [26, 143, 255] as [number, number, number],
};

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
    type Particle = { fromIdx: number; toIdx: number; progress: number; speed: number; size: number; opacity: number; targetOpacity: number };

    let W: number, H: number;
    let nodes: Node[];
    let particles: Particle[];
    let animId: number;
    let tick = 0;

    function rgba([r, g, b]: [number, number, number], a: number) {
      return `rgba(${r},${g},${b},${a.toFixed(3)})`;
    }

    function dist2(a: Node, b: Node) {
      const dx = a.x - b.x, dy = a.y - b.y;
      return dx * dx + dy * dy;
    }

    function initNodes() {
      nodes = Array.from({ length: CFG.nodeCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * CFG.nodeSpeed,
        vy: (Math.random() - 0.5) * CFG.nodeSpeed,
        r: 1.4 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function initParticles() {
      particles = Array.from({ length: CFG.particleCount }, () => ({
        fromIdx: -1,
        toIdx: -1,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
        size: 1.4 + Math.random() * 1.2,
        opacity: 0,
        targetOpacity: 0,
      }));
    }

    function buildEdges() {
      const d2 = CFG.connectDist * CFG.connectDist;
      const adj: number[][] = Array.from({ length: nodes.length }, () => []);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (dist2(nodes[i], nodes[j]) < d2) {
            adj[i].push(j);
            adj[j].push(i);
          }
        }
      }
      return adj;
    }

    function assignParticle(p: Particle, adj: number[][]) {
      for (let attempt = 0; attempt < 20; attempt++) {
        const from = Math.floor(Math.random() * nodes.length);
        if (adj[from].length > 0) {
          const to = adj[from][Math.floor(Math.random() * adj[from].length)];
          p.fromIdx = from;
          p.toIdx = to;
          p.progress = 0;
          p.targetOpacity = 0.85 + Math.random() * 0.15;
          return true;
        }
      }
      return false;
    }

    function draw() {
      animId = requestAnimationFrame(draw);
      tick++;

      ctx.fillStyle = CFG.bgColor;
      ctx.fillRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20)  { n.x = -20;  n.vx =  Math.abs(n.vx); }
        if (n.x > W+20) { n.x = W+20; n.vx = -Math.abs(n.vx); }
        if (n.y < -20)  { n.y = -20;  n.vy =  Math.abs(n.vy); }
        if (n.y > H+20) { n.y = H+20; n.vy = -Math.abs(n.vy); }
      });

      const adj = buildEdges();
      const d = CFG.connectDist;
      const d2 = d * d;

      for (let i = 0; i < nodes.length; i++) {
        for (let k = 0; k < adj[i].length; k++) {
          const j = adj[i][k];
          if (j <= i) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = 1 - dist / d;
          const alpha = 0.18 * t * t * t;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = rgba(CFG.edgeColor, alpha);
          ctx.lineWidth = 0.55;
          ctx.stroke();
        }
      }

      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(tick * 0.018 + n.phase);
        const r = n.r * (0.88 + 0.12 * pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 4.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CFG.nodeColor, 0.04 + 0.03 * pulse);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CFG.nodeColor, 0.55 + 0.25 * pulse);
        ctx.fill();
      });

      particles.forEach(p => {
        const edgeValid = p.fromIdx >= 0 && p.toIdx >= 0 &&
          adj[p.fromIdx].includes(p.toIdx) &&
          dist2(nodes[p.fromIdx], nodes[p.toIdx]) < d2;

        if (!edgeValid || p.progress >= 1) {
          if (p.opacity > 0.01) {
            p.opacity *= 0.82;
            if (p.fromIdx >= 0 && p.toIdx >= 0) {
              const prog = Math.min(p.progress, 1);
              const px = nodes[p.fromIdx].x + (nodes[p.toIdx].x - nodes[p.fromIdx].x) * prog;
              const py = nodes[p.fromIdx].y + (nodes[p.toIdx].y - nodes[p.fromIdx].y) * prog;
              ctx.beginPath();
              ctx.arc(px, py, p.size * 0.8, 0, Math.PI * 2);
              ctx.fillStyle = rgba(CFG.particleColor, p.opacity * 0.6);
              ctx.fill();
            }
            return;
          }
          p.opacity = 0;
          if (!assignParticle(p, adj)) return;
        }

        p.progress += p.speed;
        const fadeIn  = Math.min(p.progress / 0.08, 1);
        const fadeOut = Math.min((1 - p.progress) / 0.08, 1);
        p.opacity += (p.targetOpacity * fadeIn * fadeOut - p.opacity) * 0.12;

        const a = nodes[p.fromIdx], b = nodes[p.toIdx];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        const trailProg = Math.max(0, p.progress - 0.07);
        const tx = a.x + (b.x - a.x) * trailProg;
        const ty = a.y + (b.y - a.y) * trailProg;

        const grad = ctx.createLinearGradient(tx, ty, px, py);
        grad.addColorStop(0, rgba(CFG.particleColor, 0));
        grad.addColorStop(1, rgba(CFG.particleColor, p.opacity * 0.75));
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(px, py, p.size * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = rgba(CFG.particleColor, p.opacity);
        ctx.fill();
      });
    }

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initNodes();
      initParticles();
    }

    function onResize() {
      cancelAnimationFrame(animId);
      resize();
      draw();
    }

    window.addEventListener('resize', onResize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(7,11,18,0.55) 70%, rgba(7,11,18,0.85) 100%)',
        }}
      />
    </>
  );
}
