// File: src/components/ServiceArt.tsx
// Decorative wireframe drawn inline as SVG: one motif per service, with a deterministic variation per id.
// No external assets (the CSP stays as it is) and the motion respects prefers-reduced-motion.
import React from 'react';
import type { Motif } from '../data/serviceGuide';

type Props = { motif: Motif; seedKey: string; className?: string };

const CX = 160;
const CY = 80;

// Small deterministic PRNG: the same id draws the same picture on the server and in the browser.
function rng(key: string) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const spin = { className: 'motion-safe:animate-guide-spin', style: { transformBox: 'fill-box', transformOrigin: 'center' } as React.CSSProperties };
const flow = 'motion-safe:animate-guide-dash';

function Shield({ id }: { id: string }) {
  const outline = 'M160 14 L206 31 V77 C206 108 186 130 160 146 C134 130 114 108 114 77 V31 Z';
  const hexes: string[] = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 8; col++) {
      const x = 112 + col * 14 + (row % 2 ? 7 : 0);
      const y = 16 + row * 12;
      hexes.push(`M${x} ${y - 7} l6 3.5 v7 l-6 3.5 l-6 -3.5 v-7 Z`);
    }
  }
  return (
    <g>
      <clipPath id={`${id}-clip`}><path d={outline} /></clipPath>
      <g clipPath={`url(#${id}-clip)`} opacity={0.45}>{hexes.map((d, i) => <path key={i} d={d} />)}</g>
      {[1, 0.8, 0.6].map((s) => (
        <path key={s} d={outline} transform={`translate(${CX} ${CY}) scale(${s}) translate(${-CX} ${-CY})`} opacity={s} />
      ))}
      <path d={outline} strokeDasharray="5 9" className={flow} strokeWidth={1.4} />
      <path d="M146 80 l10 10 l20 -22" strokeWidth={1.6} />
    </g>
  );
}

function Target({ id }: { id: string }) {
  const r = rng(id);
  const hits = Array.from({ length: 4 }, () => [CX + (r() - 0.5) * 50, CY + (r() - 0.5) * 50]);
  return (
    <g>
      {[16, 32, 48, 64].map((rad) => <circle key={rad} cx={CX} cy={CY} r={rad} opacity={0.4 + rad / 160} />)}
      <path d={`M${CX - 76} ${CY} H${CX + 76} M${CX} ${CY - 76} V${CY + 76}`} opacity={0.5} />
      <g {...spin}>
        <circle cx={CX} cy={CY} r={56} strokeDasharray="2 6" strokeWidth={1.4} />
        <path d={`M${CX} ${CY - 70} v10 M${CX + 70} ${CY} h-10 M${CX} ${CY + 70} v-10 M${CX - 70} ${CY} h10`} strokeWidth={1.6} />
      </g>
      {hits.map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r={1.8} fill="currentColor" /><circle cx={x} cy={y} r={5} opacity={0.6} /></g>
      ))}
    </g>
  );
}

function Network({ id }: { id: string }) {
  const r = rng(id);
  const nodes = Array.from({ length: 11 }, () => [80 + r() * 150, 14 + r() * 132]);
  const edges = new Set<string>();
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1])] as const)
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1])
      .slice(0, 2)
      .forEach(([j]) => edges.add(i < j ? `${i}-${j}` : `${j}-${i}`));
  });
  const hub = nodes[0];
  return (
    <g>
      {[...edges].map((e, k) => {
        const [i, j] = e.split('-').map(Number);
        return <line key={e} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} opacity={0.55} strokeDasharray={k % 3 === 0 ? '3 5' : undefined} className={k % 3 === 0 ? flow : undefined} />;
      })}
      {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 0 ? 3.4 : 2.2} fill="currentColor" />)}
      <circle cx={hub[0]} cy={hub[1]} r={10} opacity={0.6} />
      <circle cx={hub[0]} cy={hub[1]} r={17} opacity={0.3} strokeDasharray="2 4" />
    </g>
  );
}

function Neural({ id }: { id: string }) {
  const r = rng(id);
  const layers = [4, 5 + Math.floor(r() * 2), 3].map((n, li) =>
    Array.from({ length: n }, (_, k) => [100 + li * 55, CY + (k - (n - 1) / 2) * 24] as const),
  );
  const lines: React.ReactNode[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    layers[li].forEach((a, i) => layers[li + 1].forEach((b, j) => {
      lines.push(<line key={`${li}-${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} opacity={0.28} />);
    }));
  }
  const path = layers.map((l) => l[Math.floor(r() * l.length)]);
  return (
    <g>
      {lines}
      <polyline points={path.map((p) => p.join(',')).join(' ')} strokeWidth={1.6} strokeDasharray="4 6" className={flow} />
      {layers.flat().map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill="none" />)}
      {path.map(([x, y], i) => <circle key={`p${i}`} cx={x} cy={y} r={2.2} fill="currentColor" />)}
    </g>
  );
}

function Seal() {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 * Math.PI) / 180;
    const long = i % 5 === 0;
    const r1 = 58;
    const r2 = long ? 66 : 62;
    return <line key={i} x1={CX + r1 * Math.cos(a)} y1={CY + r1 * Math.sin(a)} x2={CX + r2 * Math.cos(a)} y2={CY + r2 * Math.sin(a)} opacity={long ? 0.9 : 0.5} />;
  });
  return (
    <g>
      {ticks}
      <circle cx={CX} cy={CY} r={52} opacity={0.7} />
      <circle cx={CX} cy={CY} r={36} opacity={0.5} />
      <g {...spin}><circle cx={CX} cy={CY} r={44} strokeDasharray="1 5" strokeWidth={1.6} /></g>
      <path d={`M${CX - 14} ${CY} l9 9 l19 -21`} strokeWidth={1.8} />
    </g>
  );
}

function Radar({ id }: { id: string }) {
  const r = rng(id);
  const pt = (i: number, rad: number) => {
    const a = (-90 + i * 60) * (Math.PI / 180);
    return [CX + rad * Math.cos(a), CY + rad * Math.sin(a)];
  };
  const ring = (rad: number) => Array.from({ length: 6 }, (_, i) => pt(i, rad).join(',')).join(' ');
  const values = Array.from({ length: 6 }, () => 0.4 + r() * 0.55);
  const shape = values.map((v, i) => pt(i, v * 64));
  return (
    <g>
      {[16, 32, 48, 64].map((rad) => <polygon key={rad} points={ring(rad)} opacity={0.45} />)}
      {Array.from({ length: 6 }, (_, i) => { const [x, y] = pt(i, 64); return <line key={i} x1={CX} y1={CY} x2={x} y2={y} opacity={0.4} />; })}
      <polygon points={shape.map((p) => p.join(',')).join(' ')} fill="currentColor" fillOpacity={0.12} strokeWidth={1.6} />
      {shape.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.2} fill="currentColor" />)}
      <g {...spin}><line x1={CX} y1={CY} x2={CX} y2={CY - 68} strokeWidth={1.4} strokeDasharray="2 3" /></g>
    </g>
  );
}

function Stack({ id }: { id: string }) {
  const r = rng(id);
  const towers = id.includes('cluster') ? 3 : 1;
  const slabs = 2 + Math.floor(r() * 3);
  const box = (cx: number, cy: number, w: number, d: number, h: number, k: string) => (
    <g key={k}>
      <polygon points={`${cx},${cy - d / 2} ${cx + w / 2},${cy} ${cx},${cy + d / 2} ${cx - w / 2},${cy}`} />
      <path d={`M${cx - w / 2} ${cy} v${h} L${cx} ${cy + d / 2 + h} L${cx + w / 2} ${cy + h} V${cy} M${cx} ${cy + d / 2} v${h}`} opacity={0.75} />
      <circle cx={cx - w / 4} cy={cy + d / 4 + h / 2} r={1.4} fill="currentColor" />
      <line x1={cx + w / 8} y1={cy + d / 4 + h / 2} x2={cx + w / 2.6} y2={cy + h / 2 - 4} opacity={0.6} />
    </g>
  );
  const items: React.ReactNode[] = [];
  for (let t = 0; t < towers; t++) {
    const cx = towers === 1 ? CX : 110 + t * 50;
    const w = towers === 1 ? 92 : 46;
    for (let s = 0; s < slabs; s++) items.push(box(cx, 112 - s * 22 - t * 6, w, w * 0.5, 14, `${t}-${s}`));
  }
  const grid: React.ReactNode[] = [];
  for (let k = -4; k <= 4; k++) {
    grid.push(<line key={`a${k}`} x1={CX + k * 20 - 70} y1={140 + k * 0} x2={CX + k * 20 + 70} y2={140 - 35} opacity={0.18} />);
  }
  return <g>{grid}{items}</g>;
}

function Globe() {
  const lats = [-60, -30, 0, 30, 60];
  const longs = [15, 45, 75];
  return (
    <g>
      <circle cx={CX} cy={CY} r={58} />
      {lats.map((lat) => {
        const rad = (lat * Math.PI) / 180;
        return <ellipse key={lat} cx={CX} cy={CY + 58 * Math.sin(rad)} rx={58 * Math.cos(rad)} ry={58 * Math.cos(rad) * 0.16} opacity={0.5} />;
      })}
      {longs.map((lo) => <ellipse key={lo} cx={CX} cy={CY} rx={58 * Math.sin((lo * Math.PI) / 180)} ry={58} opacity={0.45} />)}
      <line x1={CX} y1={CY - 58} x2={CX} y2={CY + 58} opacity={0.45} />
      <g transform={`rotate(-18 ${CX} ${CY})`}>
        <ellipse cx={CX} cy={CY} rx={84} ry={22} strokeDasharray="4 7" className={flow} strokeWidth={1.4} />
        <circle cx={CX + 84} cy={CY} r={2.6} fill="currentColor" />
        <circle cx={CX - 60} cy={CY + 15} r={2} fill="currentColor" />
      </g>
    </g>
  );
}

function Pulse({ id }: { id: string }) {
  const r = rng(id);
  const spikeX = 130 + Math.floor(r() * 50);
  const ecg = `M60 ${CY} H${spikeX - 24} l6 -8 l6 8 H${spikeX - 4} l6 -46 l8 76 l6 -30 H${spikeX + 40} l6 -10 l7 10 H240`;
  const grid: React.ReactNode[] = [];
  for (let x = 60; x <= 240; x += 20) grid.push(<line key={`v${x}`} x1={x} y1={20} x2={x} y2={140} opacity={0.15} />);
  for (let y = 20; y <= 140; y += 20) grid.push(<line key={`h${y}`} x1={60} y1={y} x2={240} y2={y} opacity={0.15} />);
  return (
    <g>
      {grid}
      <path d={ecg} strokeWidth={1.4} opacity={0.5} />
      <path d={ecg} strokeWidth={1.8} strokeDasharray="14 120" className={flow} />
      <circle cx={spikeX + 2} cy={CY - 46} r={7} opacity={0.6} />
      <circle cx={spikeX + 2} cy={CY - 46} r={14} opacity={0.25} strokeDasharray="2 4" />
    </g>
  );
}

function People() {
  const person = (x: number, y: number, s: number, k: string) => (
    <g key={k}>
      <circle cx={x} cy={y - 9 * s} r={6 * s} />
      <path d={`M${x - 11 * s} ${y + 10 * s} C${x - 11 * s} ${y - 2 * s} ${x + 11 * s} ${y - 2 * s} ${x + 11 * s} ${y + 10 * s}`} />
    </g>
  );
  return (
    <g>
      <path d={`M${CX} 52 V66 M118 66 H202 M118 66 V84 M${CX} 66 V84 M202 66 V84`} opacity={0.5} strokeDasharray="3 4" className={flow} />
      {person(CX, 34, 1.1, 'top')}
      {[118, CX, 202].map((x, i) => person(x, 104, 0.9, `m${i}`))}
      {[96, 140, 180, 224].map((x, i) => <g key={`s${i}`} opacity={0.45}>{person(x, 140, 0.6, `s${i}`)}</g>)}
    </g>
  );
}

function Flow() {
  const blocks = [[92, 36], [150, 70], [208, 104], [150, 136]];
  return (
    <g>
      {blocks.map(([x, y], i) => <rect key={i} x={x - 24} y={y - 12} width={48} height={24} rx={6} opacity={i === 0 ? 1 : 0.75} />)}
      <path d="M116 36 C140 36 126 70 126 70 M174 70 C196 70 184 104 184 104 M208 116 C208 136 174 136 174 136" strokeDasharray="4 6" className={flow} strokeWidth={1.4} />
      {blocks.map(([x, y], i) => <line key={`l${i}`} x1={x - 14} y1={y} x2={x + 10} y2={y} opacity={0.5} />)}
    </g>
  );
}

function Bars({ id }: { id: string }) {
  const r = rng(id);
  const heights = Array.from({ length: 6 }, () => 24 + r() * 80);
  const xs = heights.map((_, i) => 96 + i * 24);
  const trend = heights.map((h, i) => `${xs[i] + 8},${140 - h - 8}`).join(' ');
  return (
    <g>
      <line x1={84} y1={140} x2={244} y2={140} opacity={0.6} />
      {[40, 72, 104].map((y) => <line key={y} x1={84} y1={y} x2={244} y2={y} opacity={0.15} strokeDasharray="2 4" />)}
      {heights.map((h, i) => <rect key={i} x={xs[i]} y={140 - h} width={16} height={h} rx={2} opacity={0.7} />)}
      <polyline points={trend} strokeWidth={1.6} strokeDasharray="5 6" className={flow} />
      {heights.map((h, i) => <circle key={`d${i}`} cx={xs[i] + 8} cy={140 - h - 8} r={2} fill="currentColor" />)}
    </g>
  );
}

function Matrix({ id }: { id: string }) {
  const r = rng(id);
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const level = (row + col) / 8;
      const hot = r() < level * 0.9;
      cells.push(
        <rect key={`${row}-${col}`} x={112 + col * 22} y={22 + (4 - row) * 22} width={18} height={18} rx={3}
          fill={hot ? 'currentColor' : 'none'} fillOpacity={hot ? 0.12 + level * 0.25 : 0} opacity={0.4 + level * 0.6} />,
      );
    }
  }
  return (
    <g>
      {cells}
      <path d="M104 140 H232 M104 140 V14" opacity={0.6} />
      <path d="M228 136 l4 4 l-4 4 M100 18 l4 -4 l4 4" opacity={0.6} />
    </g>
  );
}

function Document() {
  return (
    <g>
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M${126 + k * 12} ${22 + k * 10} h52 l16 16 v84 h-68 Z`} opacity={0.35 + k * 0.3} />
      ))}
      <path d="M202 42 v-16 h-16" opacity={0.8} />
      {[66, 78, 90, 102, 114].map((y, i) => <line key={y} x1={162} y1={y} x2={i === 4 ? 186 : 204} y2={y} opacity={0.55} />)}
      <circle cx={214} cy={128} r={13} strokeWidth={1.4} />
      <path d="M208 128 l4 4 l8 -9" strokeWidth={1.6} />
      <circle cx={214} cy={128} r={20} opacity={0.3} strokeDasharray="2 4" className={flow} />
    </g>
  );
}

export default function ServiceArt({ motif, seedKey, className = '' }: Props) {
  const id = `art-${seedKey}`.replace(/[^a-zA-Z0-9-]/g, '');
  const body = (() => {
    switch (motif) {
      case 'shield': return <Shield id={id} />;
      case 'target': return <Target id={id} />;
      case 'network': return <Network id={id} />;
      case 'neural': return <Neural id={id} />;
      case 'seal': return <Seal />;
      case 'radar': return <Radar id={id} />;
      case 'stack': return <Stack id={id} />;
      case 'globe': return <Globe />;
      case 'pulse': return <Pulse id={id} />;
      case 'people': return <People />;
      case 'flow': return <Flow />;
      case 'bars': return <Bars id={id} />;
      case 'matrix': return <Matrix id={id} />;
      case 'document': return <Document />;
    }
  })();
  return (
    <svg viewBox="0 0 260 160" className={className} aria-hidden focusable="false" preserveAspectRatio="xMaxYMid meet">
      <defs>
        <radialGradient id={`${id}-glow`} cx="62%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r={86} fill={`url(#${id}-glow)`} />
      <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
        {body}
      </g>
    </svg>
  );
}
