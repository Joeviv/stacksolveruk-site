// ARCHIVO: src/components/hero/HeroDotMap.tsx
// Stacksolver UK — Dot-matrix world map. SVG, no 3D, respects reduced-motion.
// Adaptado del handoff Claude Design 2026-04-23.
import { useMemo, useState, useEffect, useRef } from 'react';

// Landmask (144×72 equirectangular, base64 bitpacked)
const LANDMASK_W = 144;
const LANDMASK_H = 72;
const LANDMASK_B64 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH/4AAAAAAAAAAAAAAAAAAAAAP/4AAAAAAAAAAAAAAAP/wAAAP/4AAAAAAAAAAAAAAAB//AAAP/gAAB/+AAAAAAABAAB///gAH+AAAD/8AAAAAAAOAAB///4AD8AAAH/8AAAAAAAYAAB///+ABgAAAP/4AAAAAAAgADB////+AAAAD//gAAAAAAcAAYAf////AAAAD//AAAAAAD8AAAAP////wAADn/+AAAAAAPgAAAAD////gAAD//+AAAAAAPAAAAAD///+AAAA//8AAAAAAcAAAAAD///+AAAD//wAAAAABgAAAAAD///4AAAP//wAAAAAAEAAAAAD///gAAAP8+AAAAAAwYAAAAAB///AAAAPg4AAAAABgAAAAAAB///AAAAOAAA/gAAHggAAAAAA//8AAAAP/4Af/gAHgAAAAAAAf/8AAAAP//Af/4AfgAAAAAAAH/8AAAAf//gD////AAAAAAAAH/8AAAAf//wD//v+AAAAAAAAH/8AAAA///wAn/n4AAAAAAAAA/gAAAA///wBB+HwAAAAAAAAAfgAAAA///4DA8HwAAAAAAAAAOAAAAA///8AA4HwAAAAAAAAAAAAAAA///+QAwDgAAAAAAAAAAAAAAA///+AAwBAAAAAAAAAAAA/AAAP///AAABAAAAAAAAAAAB/wAAP///AAABAAAAAAAAAAAB/4AAAP//AAAAAAAAAAAAAAAD/8AAAP/+AAACAAAAAAAAAAAD/+AAAH/+AAADgAAAAAAAAAAD//8AAH/8AAAA+DwAAAAAAAAD//8AAD/8AAAAfH4AAAAAAAAD//8AAD/8AAAAB34AAAAAAAAA//4AAD/8AAAAAB4AAAAAAAAA//4AAB/8AAAAAH4AAAAAAAAAP/wAAB/4AAAAA/8AAAAAAAAAP/wAAB/wAAAAB/+AAAAAAAAAP/wAAA/wAAAAD//AAAAAAAAAP/gAAA/wAAAAH//gAAAAAAAAP/AAAA/gAAAAH//gAAAAAAAAf+AAAA/AAAAAH//gAAAAAAAAf8AAAA+AAAAAD//AAAAAAAAAf4AAAAcAAAAAD//AAAAAAAAAfgAAAAAAAAAAAB/AEAAAAAAAfAAAAAAAAAAAAAAAEAAAAAAAeAAAAAAAAAAAAAAAEAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

const LANDMASK = (() => {
  if (typeof atob === 'undefined') return new Uint8Array(LANDMASK_W * LANDMASK_H);
  const bin = atob(LANDMASK_B64);
  const grid = new Uint8Array(LANDMASK_W * LANDMASK_H);
  for (let i = 0; i < grid.length; i++) {
    const byte = bin.charCodeAt(Math.floor(i / 8));
    grid[i] = (byte >> (7 - (i % 8))) & 1;
  }
  return grid;
})();

const isLand = (gx: number, gy: number) => {
  if (gx < 0 || gx >= LANDMASK_W || gy < 0 || gy >= LANDMASK_H) return 0;
  return LANDMASK[gy * LANDMASK_W + gx];
};

type Region = 'usa' | 'europe';
interface City {
  key: string;
  name: string;
  flag: string;
  lat: number;
  lon: number;
  region: Region;
  anchor?: boolean;
}

const CITIES: City[] = [
  { key: 'lon', name: 'London',         flag: '🇬🇧', lat:  51.5, lon:   -0.1, region: 'europe', anchor: true },
  { key: 'edi', name: 'Edinburgh',      flag: '🇬🇧', lat:  55.9, lon:   -3.2, region: 'europe' },
  { key: 'dub', name: 'Dublin',         flag: '🇮🇪', lat:  53.3, lon:   -6.3, region: 'europe' },
  { key: 'par', name: 'Paris',          flag: '🇫🇷', lat:  48.9, lon:    2.3, region: 'europe' },
  { key: 'ams', name: 'Amsterdam',      flag: '🇳🇱', lat:  52.4, lon:    4.9, region: 'europe' },
  { key: 'ber', name: 'Berlin',         flag: '🇩🇪', lat:  52.5, lon:   13.4, region: 'europe' },
  { key: 'mad', name: 'Madrid',         flag: '🇪🇸', lat:  40.4, lon:   -3.7, region: 'europe' },
  { key: 'nyc', name: 'New York',       flag: '🇺🇸', lat:  40.7, lon:  -74.0, region: 'usa', anchor: true },
  { key: 'mia', name: 'Miami',          flag: '🇺🇸', lat:  25.8, lon:  -80.2, region: 'usa' },
  { key: 'sfo', name: 'San Francisco',  flag: '🇺🇸', lat:  37.8, lon: -122.4, region: 'usa' },
  { key: 'chi', name: 'Chicago',        flag: '🇺🇸', lat:  41.9, lon:  -87.6, region: 'usa' },
];

interface Arc { from: string; to: string; primary?: boolean; world?: boolean; }
const ARCS: Arc[] = [
  { from: 'lon', to: 'nyc', primary: true },
  { from: 'lon', to: 'sfo' },
  { from: 'lon', to: 'mia' },
  { from: 'edi', to: 'nyc' },
  { from: 'dub', to: 'chi' },
  { from: 'par', to: 'nyc', world: true },
  { from: 'mad', to: 'mia', world: true },
  { from: 'lon', to: 'ber', world: true },
  { from: 'lon', to: 'mad', world: true },
];

const VW = 1440;
const VH = 720;
const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * VW,
  y: ((90 - lat) / 180) * VH,
});

const DOT_STEP_X = VW / LANDMASK_W;
const DOT_STEP_Y = VH / LANDMASK_H;

function buildDots() {
  const dots: { x: number; y: number; gx: number; gy: number }[] = [];
  for (let gy = 0; gy < LANDMASK_H; gy++) {
    for (let gx = 0; gx < LANDMASK_W; gx++) {
      if (!isLand(gx, gy)) continue;
      const jx = (gy % 2) * DOT_STEP_X * 0.5;
      dots.push({
        x: gx * DOT_STEP_X + DOT_STEP_X / 2 + jx,
        y: gy * DOT_STEP_Y + DOT_STEP_Y / 2,
        gx, gy,
      });
    }
  }
  return dots;
}

function arcPath(pA: { x: number; y: number }, pB: { x: number; y: number }) {
  const mx = (pA.x + pB.x) / 2;
  const my = (pA.y + pB.y) / 2;
  const dx = pB.x - pA.x;
  const dy = pB.y - pA.y;
  const len = Math.hypot(dx, dy);
  const lift = Math.min(260, len * 0.32);
  const nx = -dy / len;
  const ny = dx / len;
  const sign = ny > 0 ? -1 : 1;
  const cx = mx + nx * lift * sign;
  const cy = my + ny * lift * sign;
  return { d: `M ${pA.x} ${pA.y} Q ${cx} ${cy} ${pB.x} ${pB.y}`, cx, cy };
}

export interface HeroDotMapProps {
  theme?: 'dark' | 'light';
  regionHighlight?: 'usa' | 'europe' | 'both';
  arcDensity?: 'transatlantic' | 'highlighted' | 'world';
  arcIntensity?: 'subtle' | 'normal' | 'vivid';
}

export default function HeroDotMap({
  theme = 'dark',
  regionHighlight = 'both',
  arcDensity = 'transatlantic',
  arcIntensity = 'normal',
}: HeroDotMapProps) {
  const dots = useMemo(() => buildDots(), []);
  const [hover, setHover] = useState<{ city: City; x: number; y: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const cityPoints = useMemo(() => {
    const byKey: Record<string, City & { x: number; y: number }> = {};
    CITIES.forEach(c => { byKey[c.key] = { ...c, ...project(c.lat, c.lon) }; });
    return byKey;
  }, []);

  const isDark = theme === 'dark';
  const dotBase       = isDark ? '#3f3f46' : '#e4e4e7';
  const dotHighlight  = isDark ? '#a6c04d' : '#85a03a';
  const dotBright     = isDark ? '#cfe27a' : '#6d8530';
  const arcColor      = '#85a03a';
  const arcBright     = isDark ? '#a6c04d' : '#6d8530';
  const pulseCore     = isDark ? '#e9f3c6' : '#ffffff';
  const tooltipBg     = isDark ? '#18181b' : '#ffffff';
  const tooltipBorder = isDark ? '#27272a' : '#e4e4e7';
  const tooltipText   = isDark ? '#fafafa' : '#18181b';
  const tooltipSub    = isDark ? '#a1a1aa' : '#52525b';
  const bgAccent      = isDark
    ? 'radial-gradient(ellipse at 50% 45%, rgba(133,160,58,0.10), transparent 60%)'
    : 'radial-gradient(ellipse at 50% 45%, rgba(133,160,58,0.06), transparent 60%)';

  const intensity = {
    subtle: { arc: 0.35, glow: 0.18, pulse: 0.8, lineW: 1.2 },
    normal: { arc: 0.6,  glow: 0.35, pulse: 1.0, lineW: 1.6 },
    vivid:  { arc: 0.9,  glow: 0.6,  pulse: 1.0, lineW: 2.2 },
  }[arcIntensity];

  const highlightUsa    = regionHighlight === 'both' || regionHighlight === 'usa';
  const highlightEurope = regionHighlight === 'both' || regionHighlight === 'europe';
  const isCityHighlighted = (c: City) =>
    (c.region === 'usa' && highlightUsa) ||
    (c.region === 'europe' && highlightEurope);

  const activeArcs = ARCS.filter(a => {
    if (arcDensity === 'transatlantic') return !a.world;
    if (arcDensity === 'highlighted') {
      const A = cityPoints[a.from], B = cityPoints[a.to];
      return A && B && isCityHighlighted(A) && isCityHighlighted(B);
    }
    return true;
  });

  const regionHalos: { cx: number; cy: number; r: number; key: string }[] = [];
  if (highlightUsa) {
    const nyc = cityPoints.nyc;
    if (nyc) regionHalos.push({ cx: nyc.x, cy: nyc.y + 20, r: 200, key: 'usa' });
  }
  if (highlightEurope) {
    const lon = cityPoints.lon;
    if (lon) regionHalos.push({ cx: lon.x, cy: lon.y + 20, r: 180, key: 'europe' });
  }

  const handleEnter = (c: City, evt: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setHover({ city: c, x: evt.clientX - rect.left, y: evt.clientY - rect.top });
  };
  const handleMove = (evt: React.MouseEvent) => {
    if (!hover || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setHover(h => h && { ...h, x: evt.clientX - rect.left, y: evt.clientY - rect.top });
  };
  const handleLeave = () => setHover(null);

  const styleBlock = `
    @keyframes ss-pulse-dot { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
    @keyframes ss-pulse-halo { 0%,100% { opacity: 0.35; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.4); } }
    @keyframes ss-dash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -40; } }
    .ss-dot-anchor { transform-origin: center; transform-box: fill-box; animation: ss-pulse-dot 2.4s ease-in-out infinite; }
    .ss-halo-anchor { transform-origin: center; transform-box: fill-box; animation: ss-pulse-halo 2.4s ease-in-out infinite; }
    .ss-dot-hi { transform-origin: center; transform-box: fill-box; animation: ss-pulse-dot 3.6s ease-in-out infinite; }
    .ss-arc-flow { stroke-dasharray: 6 10; animation: ss-dash 1.6s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
      .ss-dot-anchor, .ss-halo-anchor, .ss-dot-hi, .ss-arc-flow { animation: none !important; }
    }
  `;

  const vbX = ((-135 + 180) / 360) * VW;
  const vbY = ((90 - 72) / 180) * VH;
  const vbW = ((50 - -135) / 360) * VW;
  const vbH = ((72 - -38) / 180) * VH;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 420, background: bgAccent, overflow: 'hidden' }}
    >
      <style>{styleBlock}</style>
      <svg
        ref={svgRef}
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="ss-region-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#85a03a" stopOpacity={isDark ? 0.28 : 0.18} />
            <stop offset="55%" stopColor="#85a03a" stopOpacity={isDark ? 0.10 : 0.06} />
            <stop offset="100%" stopColor="#85a03a" stopOpacity="0" />
          </radialGradient>
          <filter id="ss-arc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={arcIntensity === 'vivid' ? 4 : arcIntensity === 'normal' ? 2.5 : 1.5} />
          </filter>
          <filter id="ss-pulse-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <g>
          {regionHalos.map(h => (
            <circle key={h.key} cx={h.cx} cy={h.cy} r={h.r} fill="url(#ss-region-halo)" style={{ opacity: intensity.glow * 1.6 }} />
          ))}
        </g>
        <g>
          {dots.map((d, i) => {
            let brightness = 0;
            for (const c of CITIES) {
              if (!isCityHighlighted(c)) continue;
              const p = cityPoints[c.key];
              const dx = d.x - p.x, dy = d.y - p.y;
              const dist = Math.hypot(dx, dy);
              if (c.anchor) {
                if (dist < 110) brightness = Math.max(brightness, 1 - dist / 110);
              } else {
                if (dist < 70) brightness = Math.max(brightness, (1 - dist / 70) * 0.7);
              }
            }
            const r = 2 + brightness * 1.4;
            const color = brightness > 0.05 ? (brightness > 0.7 ? dotBright : dotHighlight) : dotBase;
            const opacity = brightness > 0.05 ? 0.55 + brightness * 0.45 : 0.75;
            return <circle key={i} cx={d.x} cy={d.y} r={r} fill={color} opacity={opacity} />;
          })}
        </g>
        <g>
          {activeArcs.map((a, i) => {
            const A = cityPoints[a.from];
            const B = cityPoints[a.to];
            if (!A || !B) return null;
            const { d } = arcPath(A, B);
            const isPrimary = a.primary;
            const lw = intensity.lineW * (isPrimary ? 1.35 : 1);
            const col = isPrimary ? arcBright : arcColor;
            return (
              <g key={`${a.from}-${a.to}-${i}`}>
                <path d={d} stroke={col} strokeWidth={lw * 3} fill="none" strokeLinecap="round" filter="url(#ss-arc-glow)" opacity={intensity.glow} />
                <path d={d} stroke={col} strokeWidth={lw} fill="none" strokeLinecap="round" opacity={intensity.arc} />
                {!reducedMotion && (
                  <path d={d} stroke={pulseCore} strokeWidth={lw * 0.6} fill="none" strokeLinecap="round" className="ss-arc-flow" opacity={intensity.pulse * (isPrimary ? 0.95 : 0.6)} style={{ animationDelay: `${(i * 0.35) % 1.6}s` }} />
                )}
                {!reducedMotion && (
                  <circle r={isPrimary ? 6 : 4} fill={pulseCore} opacity={intensity.pulse} filter="url(#ss-pulse-glow)">
                    <animateMotion dur={`${isPrimary ? 3.2 : 4.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} path={d} rotate="auto" />
                  </circle>
                )}
              </g>
            );
          })}
        </g>
        <g>
          {CITIES.map(c => {
            const p = cityPoints[c.key];
            const hi = isCityHighlighted(c);
            const isAnchor = !!c.anchor && hi;
            const baseR = isAnchor ? 6 : hi ? 4 : 2.5;
            const col = isAnchor ? pulseCore : hi ? dotBright : dotBase;
            return (
              <g key={c.key}>
                {hi && (
                  <circle cx={p.x} cy={p.y} r={isAnchor ? 22 : 14} fill={arcColor} className={isAnchor && !reducedMotion ? 'ss-halo-anchor' : ''} opacity={isAnchor ? 0.45 : 0.3} />
                )}
                <circle cx={p.x} cy={p.y} r={baseR} fill={col} className={isAnchor && !reducedMotion ? 'ss-dot-anchor' : (hi && !reducedMotion ? 'ss-dot-hi' : '')} style={{ filter: isAnchor ? 'drop-shadow(0 0 8px #a6c04d)' : 'none' }} />
                <circle cx={p.x} cy={p.y} r={18} fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={(e) => handleEnter(c, e)} onMouseLeave={handleLeave} />
              </g>
            );
          })}
        </g>
      </svg>
      {hover && (
        <div role="tooltip" style={{
          position: 'absolute', left: hover.x + 14, top: hover.y - 14,
          transform: 'translateY(-100%)',
          background: tooltipBg, border: `1px solid ${tooltipBorder}`,
          borderRadius: 10, padding: '8px 12px', minWidth: 140,
          boxShadow: isDark ? '0 16px 40px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(133,160,58,0.25) inset' : '0 12px 32px -8px rgba(24,24,27,0.12)',
          pointerEvents: 'none', zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, color: tooltipText, letterSpacing: '-0.01em' }}>
            <span style={{ fontSize: 16 }}>{hover.city.flag}</span>
            <span>{hover.city.name}</span>
          </div>
          <div style={{ marginTop: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: tooltipSub, letterSpacing: '0.02em' }}>
            {hover.city.lat.toFixed(1)}°{hover.city.lat >= 0 ? 'N' : 'S'} · {Math.abs(hover.city.lon).toFixed(1)}°{hover.city.lon >= 0 ? 'E' : 'W'}
            {hover.city.anchor && <span style={{ color: arcBright, marginLeft: 6 }}>· anchor</span>}
          </div>
        </div>
      )}
    </div>
  );
}
