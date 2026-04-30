// File: src/components/hero/HeroDotMap.tsx
// Dot-matrix map — UK + Western/Central Europe focus.
// Country borders dotted in light grey, London hub flows out to EU capitals.
import { useEffect, useMemo, useRef, useState } from 'react';

// ---------- Landmask (144x72 equirectangular, base64 bitpacked) -----------
const LANDMASK_W = 144;
const LANDMASK_H = 72;
const LANDMASK_B64 =
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH/4AAAAAAAAAAAAAAAAAAAAAP/4AAAAAAAAAAAAAAAP/wAAAP/4AAAAAAAAAAAAAAAB//AAAP/gAAB/+AAAAAAABAAB///gAH+AAAD/8AAAAAAAOAAB///4AD8AAAH/8AAAAAAAYAAB///+ABgAAAP/4AAAAAAAgADB////+AAAAD//gAAAAAAcAAYAf////AAAAD//AAAAAAD8AAAAP////wAADn/+AAAAAAPgAAAAD////gAAD//+AAAAAAPAAAAAD///+AAAA//8AAAAAAcAAAAAD///+AAAD//wAAAAABgAAAAAD///4AAAP//wAAAAAAEAAAAAD///gAAAP8+AAAAAAwYAAAAAB///AAAAPg4AAAAABgAAAAAAB///AAAAOAAA/gAAHggAAAAAA//8AAAAP/4Af/gAHgAAAAAAAf/8AAAAP//Af/4AfgAAAAAAAH/8AAAAf//gD////AAAAAAAAH/8AAAAf//wD//v+AAAAAAAAH/8AAAA///wAn/n4AAAAAAAAA/gAAAA///wBB+HwAAAAAAAAAfgAAAA///4DA8HwAAAAAAAAAOAAAAA///8AA4HwAAAAAAAAAAAAAAA///+QAwDgAAAAAAAAAAAAAAA///+AAwBAAAAAAAAAAAA/AAAP///AAABAAAAAAAAAAAB/wAAP///AAABAAAAAAAAAAAB/4AAAP//AAAAAAAAAAAAAAAD/8AAAP/+AAACAAAAAAAAAAAD/+AAAH/+AAADgAAAAAAAAAAD//8AAH/8AAAA+DwAAAAAAAAD//8AAD/8AAAAfH4AAAAAAAAD//8AAD/8AAAAB34AAAAAAAAA//4AAD/8AAAAAB4AAAAAAAAA//4AAB/8AAAAAH4AAAAAAAAAP/wAAB/4AAAAA/8AAAAAAAAAP/wAAB/wAAAAB/+AAAAAAAAAP/wAAA/wAAAAD//AAAAAAAAAP/gAAA/wAAAAH//gAAAAAAAAP/AAAA/gAAAAH//gAAAAAAAAf+AAAA/AAAAAH//gAAAAAAAAf8AAAA+AAAAAD//AAAAAAAAAf4AAAAcAAAAAD//AAAAAAAAAfgAAAAAAAAAAAB/AEAAAAAAAfAAAAAAAAAAAAAAAEAAAAAAAeAAAAAAAAAAAAAAAEAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

const LANDMASK = (() => {
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

// ---------- Cities -----------
export type City = {
  key: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  region: 'uk' | 'eu';
  hub?: boolean;
  uk?: boolean;
  population: string;
};

export const CITIES: City[] = [
  { key: 'lon', name: 'London',     country: 'UK',         lat: 51.51, lon:  -0.13, region: 'uk', hub: true,  population: '9.0M' },
  { key: 'man', name: 'Manchester', country: 'England',    lat: 53.48, lon:  -2.24, region: 'uk', uk: true,   population: '2.7M' },
  { key: 'bir', name: 'Birmingham', country: 'England',    lat: 52.49, lon:  -1.90, region: 'uk', uk: true,   population: '2.6M' },
  { key: 'edi', name: 'Edinburgh',  country: 'Scotland',   lat: 55.95, lon:  -3.19, region: 'uk', uk: true,   population: '530K' },
  { key: 'gla', name: 'Glasgow',    country: 'Scotland',   lat: 55.86, lon:  -4.25, region: 'uk', uk: true,   population: '630K' },
  { key: 'car', name: 'Cardiff',    country: 'Wales',      lat: 51.48, lon:  -3.18, region: 'uk', uk: true,   population: '370K' },
  { key: 'bel', name: 'Belfast',    country: 'N. Ireland', lat: 54.60, lon:  -5.93, region: 'uk', uk: true,   population: '345K' },
  { key: 'dub', name: 'Dublin',     country: 'Ireland',     lat: 53.35, lon:  -6.26, region: 'eu', population: '1.5M' },
  { key: 'par', name: 'Paris',      country: 'France',      lat: 48.86, lon:   2.35, region: 'eu', population: '11.2M' },
  { key: 'mad', name: 'Madrid',     country: 'Spain',       lat: 40.42, lon:  -3.70, region: 'eu', population: '6.7M' },
  { key: 'lis', name: 'Lisbon',     country: 'Portugal',    lat: 38.72, lon:  -9.14, region: 'eu', population: '2.9M' },
  { key: 'ber', name: 'Berlin',     country: 'Germany',     lat: 52.52, lon:  13.40, region: 'eu', population: '3.8M' },
  { key: 'rom', name: 'Rome',       country: 'Italy',       lat: 41.90, lon:  12.50, region: 'eu', population: '4.3M' },
  { key: 'ams', name: 'Amsterdam',  country: 'Netherlands', lat: 52.37, lon:   4.90, region: 'eu', population: '1.2M' },
  { key: 'bru', name: 'Brussels',   country: 'Belgium',     lat: 50.85, lon:   4.35, region: 'eu', population: '1.2M' },
  { key: 'cph', name: 'Copenhagen', country: 'Denmark',     lat: 55.68, lon:  12.57, region: 'eu', population: '1.4M' },
  { key: 'osl', name: 'Oslo',       country: 'Norway',      lat: 59.91, lon:  10.75, region: 'eu', population: '1.1M' },
  { key: 'sto', name: 'Stockholm',  country: 'Sweden',      lat: 59.33, lon:  18.07, region: 'eu', population: '1.7M' },
  { key: 'war', name: 'Warsaw',     country: 'Poland',      lat: 52.23, lon:  21.01, region: 'eu', population: '1.8M' },
  { key: 'vie', name: 'Vienna',     country: 'Austria',     lat: 48.21, lon:  16.37, region: 'eu', population: '2.0M' },
  { key: 'pra', name: 'Prague',     country: 'Czechia',     lat: 50.08, lon:  14.43, region: 'eu', population: '1.3M' },
];

type Arc = { from: string; to: string; uk?: boolean; primary?: boolean };

const ARCS: Arc[] = [
  { from: 'edi', to: 'lon', uk: true },
  { from: 'gla', to: 'lon', uk: true },
  { from: 'man', to: 'lon', uk: true },
  { from: 'bir', to: 'lon', uk: true },
  { from: 'car', to: 'lon', uk: true },
  { from: 'bel', to: 'lon', uk: true },
  { from: 'lon', to: 'dub', primary: true },
  { from: 'lon', to: 'par', primary: true },
  { from: 'lon', to: 'mad', primary: true },
  { from: 'lon', to: 'lis', primary: true },
  { from: 'lon', to: 'ber', primary: true },
  { from: 'lon', to: 'rom', primary: true },
  { from: 'lon', to: 'ams', primary: true },
  { from: 'lon', to: 'bru', primary: true },
  { from: 'lon', to: 'cph', primary: true },
  { from: 'lon', to: 'osl', primary: true },
  { from: 'lon', to: 'sto', primary: true },
  { from: 'lon', to: 'war', primary: true },
  { from: 'lon', to: 'vie', primary: true },
  { from: 'lon', to: 'pra', primary: true },
];

// ---------- Country border polylines -----------
type Border = { id: string; closed: boolean; points: [number, number][] };
const COUNTRY_BORDERS: Border[] = [
  { id: 'gb', closed: true, points: [
    [-5.7,50.1],[-4.2,50.4],[-3.5,50.7],[-2.4,50.6],[-1.5,50.7],[-0.5,50.7],
    [0.5,50.9],[1.4,51.4],[1.7,52.0],[1.6,52.7],[1.0,52.9],[0.3,53.0],
    [0.0,53.5],[-0.2,54.5],[-1.3,54.7],[-1.4,55.5],[-2.1,55.8],[-3.0,56.0],
    [-2.5,56.5],[-2.0,57.0],[-1.8,57.6],[-2.0,58.5],[-3.0,58.7],[-4.0,58.6],
    [-5.0,58.5],[-5.5,58.0],[-5.8,57.5],[-5.7,57.0],[-5.5,56.5],[-5.8,56.0],
    [-5.4,55.6],[-4.8,55.0],[-4.5,54.7],[-4.7,54.2],[-4.0,53.4],[-3.0,53.4],
    [-3.2,53.0],[-4.0,52.8],[-4.7,52.7],[-5.2,52.0],[-5.0,51.6],[-4.3,51.2],
    [-3.5,51.4],[-3.0,51.3],[-2.5,51.4],[-2.0,51.3],[-3.5,50.7],[-4.5,50.4],[-5.7,50.1],
  ]},
  { id: 'ni', closed: true, points: [
    [-7.5,54.1],[-7.0,54.0],[-6.4,54.1],[-5.7,54.0],[-5.5,54.4],[-5.5,54.7],
    [-5.9,55.0],[-6.5,55.2],[-7.4,55.2],[-8.1,55.0],[-7.9,54.6],[-7.5,54.1],
  ]},
  { id: 'ie', closed: true, points: [
    [-9.5,54.3],[-10.1,53.9],[-10.0,53.5],[-9.7,52.7],[-10.4,52.2],[-10.0,51.8],
    [-9.0,51.5],[-8.0,51.6],[-7.0,51.9],[-6.4,52.2],[-6.2,52.8],[-6.1,53.5],
    [-6.4,54.0],[-7.5,54.1],[-7.9,54.6],[-8.1,55.0],[-9.0,54.7],[-9.5,54.3],
  ]},
  { id: 'fr', closed: true, points: [
    [-1.5,43.5],[-1.0,44.5],[-1.2,45.5],[-1.0,46.0],[-1.6,46.5],[-2.1,47.3],
    [-2.9,47.5],[-4.2,47.8],[-4.7,48.0],[-4.5,48.5],[-3.5,48.9],[-2.5,48.7],
    [-1.5,48.7],[-1.0,49.3],[0.0,49.5],[1.0,49.7],[1.6,50.4],[2.4,50.9],
    [3.6,50.4],[4.8,49.8],[5.7,49.5],[6.4,49.2],[7.6,49.1],[8.2,48.9],
    [7.6,48.0],[7.5,47.5],[6.9,47.4],[6.4,47.0],[6.8,46.4],[7.0,45.9],
    [6.6,45.1],[7.0,44.3],[7.7,43.8],[7.4,43.7],[6.5,43.2],[5.4,43.3],
    [4.0,43.6],[3.0,43.1],[2.0,42.5],[1.0,42.4],[0.0,42.7],[-1.5,43.1],[-1.5,43.5],
  ]},
  { id: 'es', closed: true, points: [
    [-9.0,42.0],[-9.3,41.0],[-9.0,40.0],[-8.9,38.5],[-8.8,37.0],[-7.5,37.2],
    [-7.4,36.8],[-6.5,36.6],[-5.6,36.0],[-4.8,36.7],[-3.5,36.7],[-2.6,36.7],
    [-1.6,37.4],[-0.7,37.8],[0.2,38.5],[0.0,39.5],[0.6,40.5],[1.5,41.0],
    [3.0,41.7],[3.3,42.4],[1.7,42.5],[0.7,42.8],[-0.3,42.8],[-1.5,43.1],
    [-1.8,43.3],[-2.7,43.4],[-3.8,43.5],[-5.3,43.6],[-6.7,43.5],[-7.7,43.7],
    [-8.5,43.4],[-9.3,43.0],[-9.0,42.0],
  ]},
  { id: 'pt', closed: true, points: [
    [-8.9,41.9],[-8.2,42.1],[-7.5,41.8],[-7.0,41.9],[-6.6,41.6],[-7.0,40.5],
    [-7.0,39.6],[-7.4,39.0],[-7.0,38.2],[-7.4,37.2],[-8.8,37.0],[-8.9,38.5],
    [-9.0,40.0],[-9.3,41.0],[-8.9,41.9],
  ]},
  { id: 'de', closed: true, points: [
    [6.1,50.8],[6.1,51.8],[7.1,53.4],[8.0,53.7],[8.7,54.0],[9.2,54.8],
    [9.8,54.5],[11.0,54.4],[12.3,54.5],[13.6,54.0],[14.4,53.4],[14.1,52.5],
    [14.4,51.5],[15.0,51.0],[14.5,50.6],[13.5,50.2],[12.4,49.7],[12.7,48.7],
    [13.4,48.5],[12.8,47.7],[11.0,47.4],[10.4,47.5],[9.5,47.5],[8.5,47.7],
    [7.5,47.6],[7.5,48.5],[7.6,49.1],[6.4,49.2],[6.1,50.8],
  ]},
  { id: 'it', closed: true, points: [
    [7.7,43.8],[7.4,44.1],[7.0,44.3],[6.6,45.1],[7.0,45.9],[7.9,46.0],
    [9.0,46.5],[10.4,46.5],[12.4,46.7],[13.6,46.5],[13.7,45.6],[13.0,45.6],
    [12.5,45.5],[12.3,44.5],[14.0,42.0],[15.5,41.9],[16.0,41.4],[18.5,40.0],
    [18.4,39.8],[17.0,39.0],[16.5,38.9],[16.1,37.9],[15.7,38.3],[15.1,38.0],
    [13.5,38.7],[12.4,38.0],[14.0,40.8],[13.0,40.8],[11.0,42.4],[10.0,42.5],
    [11.0,43.5],[10.4,43.9],[9.7,44.0],[8.4,44.2],[7.7,43.8],
  ]},
  { id: 'nl', closed: true, points: [
    [3.4,51.4],[4.0,51.4],[4.2,51.3],[5.0,51.5],[6.1,51.9],[7.1,53.4],
    [6.8,53.5],[6.0,53.4],[5.0,53.1],[4.7,52.9],[4.6,52.3],[4.2,51.8],[3.4,51.4],
  ]},
  { id: 'be', closed: true, points: [
    [2.5,51.1],[3.4,51.4],[4.2,51.3],[5.0,51.5],[5.9,50.8],[6.1,50.5],
    [5.7,49.8],[5.3,49.7],[4.8,49.8],[4.2,49.9],[3.6,50.4],[2.4,50.9],[2.5,51.1],
  ]},
  { id: 'ch', closed: true, points: [
    [6.1,46.2],[6.4,46.4],[6.4,47.0],[7.0,47.5],[7.7,47.6],[8.5,47.7],
    [9.5,47.5],[10.4,47.0],[10.4,46.5],[9.0,46.0],[8.0,45.9],[7.0,45.9],[6.6,45.8],[6.1,46.2],
  ]},
  { id: 'at', closed: true, points: [
    [9.5,47.5],[10.4,47.5],[11.0,47.4],[12.8,47.7],[13.4,48.5],[14.5,48.6],
    [16.0,48.8],[16.9,48.7],[17.0,48.0],[16.0,47.4],[15.0,46.6],[13.5,46.5],
    [12.4,46.7],[10.4,46.5],[10.4,47.0],[9.5,47.5],
  ]},
  { id: 'cz', closed: true, points: [
    [12.4,49.7],[13.5,50.2],[14.5,50.6],[15.0,51.0],[16.0,50.8],[17.0,50.2],
    [18.0,49.7],[18.5,49.5],[18.0,49.0],[17.0,48.8],[16.0,48.8],[14.5,48.6],
    [13.4,48.5],[12.7,48.7],[12.4,49.7],
  ]},
  { id: 'pl', closed: true, points: [
    [14.4,53.4],[14.1,52.5],[14.4,51.5],[15.0,51.0],[16.0,50.8],[17.0,50.2],
    [18.0,49.7],[19.5,49.4],[21.0,49.4],[22.5,49.0],[23.5,50.5],[23.7,52.0],
    [23.2,52.7],[22.8,54.0],[19.5,54.4],[16.5,54.5],[14.4,53.4],
  ]},
  { id: 'dk', closed: true, points: [
    [8.0,54.9],[8.5,55.5],[8.1,56.6],[8.4,57.0],[9.5,57.5],[10.5,57.4],
    [10.7,56.5],[10.6,56.0],[12.4,56.0],[12.6,55.5],[12.0,55.2],[11.0,55.0],
    [10.0,54.7],[9.2,54.8],[8.7,54.0],[8.0,54.9],
  ]},
  { id: 'no', closed: false, points: [
    [5.7,58.5],[5.5,59.5],[5.0,60.5],[5.0,61.5],[6.0,62.5],[7.5,63.5],
    [9.0,63.5],[10.5,63.7],[12.5,64.5],[14.0,65.5],[15.5,67.0],[17.5,68.5],
    [20.5,69.5],[24.0,70.5],[28.0,70.5],[30.5,69.7],[29.5,69.0],
  ]},
  { id: 'se', closed: false, points: [
    [11.0,58.0],[11.5,57.5],[12.5,56.5],[14.0,56.0],[15.5,56.2],[16.5,57.0],
    [17.0,58.5],[18.5,59.0],[18.0,60.5],[17.0,61.5],[17.5,62.5],[19.0,63.5],
    [21.0,64.5],[22.5,65.5],[24.0,66.0],[24.0,67.0],[23.0,68.0],
  ]},
  { id: 'fi', closed: false, points: [
    [21.5,60.0],[22.0,60.5],[22.5,61.5],[23.5,62.5],[24.5,63.5],[25.0,64.5],
    [25.5,65.5],[24.0,67.0],[23.0,68.0],[24.0,69.0],[26.0,70.0],[28.0,70.0],
    [30.0,69.0],[30.5,68.0],[31.0,67.0],[30.0,66.0],[28.0,64.0],
  ]},
];

// ---------- Projection -----------
const VW = 1440;
const VH = 720;

const project = (lat: number, lon: number) => ({
  x: ((lon + 180) / 360) * VW,
  y: ((90 - lat) / 180) * VH,
});

const DOT_DENSITY = 3;
const DOT_STEP_X = VW / (LANDMASK_W * DOT_DENSITY);
const DOT_STEP_Y = VH / (LANDMASK_H * DOT_DENSITY);

type Dot = { x: number; y: number };

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const W = LANDMASK_W * DOT_DENSITY;
  const H = LANDMASK_H * DOT_DENSITY;
  for (let dy = 0; dy < H; dy++) {
    for (let dx = 0; dx < W; dx++) {
      const gx = Math.floor(dx / DOT_DENSITY);
      const gy = Math.floor(dy / DOT_DENSITY);
      if (!isLand(gx, gy)) continue;
      const jx = (dy % 2) * DOT_STEP_X * 0.5;
      dots.push({
        x: dx * DOT_STEP_X + DOT_STEP_X / 2 + jx,
        y: dy * DOT_STEP_Y + DOT_STEP_Y / 2,
      });
    }
  }
  return dots;
}

function sampleBorderDots(
  points: [number, number][],
  opts: { closed: boolean; spacing?: number }
): Dot[] {
  const spacing = opts.spacing ?? 7;
  const proj = points.map(([lon, lat]) => project(lat, lon));
  const out: Dot[] = [];
  const n = proj.length;
  const segs = opts.closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const a = proj[i];
    const b = proj[(i + 1) % n];
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.round(len / spacing));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      out.push({ x: a.x + dx * t, y: a.y + dy * t });
    }
  }
  return out;
}

function arcPath(pA: { x: number; y: number }, pB: { x: number; y: number }) {
  const mx = (pA.x + pB.x) / 2;
  const my = (pA.y + pB.y) / 2;
  const dx = pB.x - pA.x;
  const dy = pB.y - pA.y;
  const len = Math.hypot(dx, dy);
  const lift = Math.min(50, len * 0.45);
  const nx = -dy / len;
  const ny = dx / len;
  const sign = ny > 0 ? -1 : 1;
  const cx = mx + nx * lift * sign;
  const cy = my + ny * lift * sign;
  return { d: `M ${pA.x} ${pA.y} Q ${cx} ${cy} ${pB.x} ${pB.y}` };
}

// Europe-zoom viewBox: lon -12 to +30, lat 35 to 62
const VB_X = ((-12 + 180) / 360) * VW;
const VB_Y = ((90 - 62) / 180) * VH;
const VB_W = ((30 - -12) / 360) * VW;
const VB_H = ((62 - 35) / 180) * VH;

export type HeroDotMapProps = {
  theme?: 'dark' | 'light';
  arcDensity?: 'all' | 'primary';
  arcIntensity?: 'subtle' | 'normal' | 'vivid';
  svgRefOut?: React.MutableRefObject<SVGSVGElement | null>;
};

export default function HeroDotMap({
  theme = 'light',
  arcDensity = 'all',
  arcIntensity = 'normal',
  svgRefOut,
}: HeroDotMapProps) {
  const dots = useMemo(() => buildDots(), []);
  const borderDots = useMemo(
    () => COUNTRY_BORDERS.map(b => ({
      id: b.id,
      uk: b.id === 'gb' || b.id === 'ni',
      dots: sampleBorderDots(b.points, { closed: b.closed, spacing: 8 }),
    })),
    []
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRefOut) svgRefOut.current = svgRef.current;
  }, [svgRefOut]);

  useEffect(() => {
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
  const dotBase      = isDark ? '#3f3f46' : '#e4e4e7';
  const dotHighlight = isDark ? '#a6c04d' : '#85a03a';
  const dotBright    = isDark ? '#cfe27a' : '#6d8530';
  const arcColor     = '#85a03a';
  const arcBright    = isDark ? '#a6c04d' : '#6d8530';
  const pulseCore    = isDark ? '#e9f3c6' : '#ffffff';
  const bgAccent     = isDark
    ? 'radial-gradient(ellipse at 50% 45%, rgba(133,160,58,0.10), transparent 60%)'
    : 'radial-gradient(ellipse at 50% 45%, rgba(133,160,58,0.06), transparent 60%)';

  const intensity = {
    subtle: { arc: 0.35, glow: 0.18, pulse: 0.8, lineW: 0.5 },
    normal: { arc: 0.6,  glow: 0.35, pulse: 1.0, lineW: 0.7 },
    vivid:  { arc: 0.9,  glow: 0.6,  pulse: 1.0, lineW: 1.0 },
  }[arcIntensity];

  const isHighlighted = (c: City) => c.region === 'uk' || c.region === 'eu';

  const activeArcs = ARCS.filter(a => {
    if (arcDensity === 'primary') return !a.uk;
    return true;
  });

  const lonPt = cityPoints.lon;
  const regionHalos = [{ cx: lonPt.x, cy: lonPt.y, r: 25, key: 'uk' }];

  const styleBlock = `
    @keyframes ss-dash {
      from { stroke-dashoffset: 0; }
      to   { stroke-dashoffset: -40; }
    }
    .ss-arc-flow { stroke-dasharray: 6 10; animation: ss-dash 1.6s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
      .ss-arc-flow { animation: none !important; }
    }
  `;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: 380,
      background: bgAccent,
      overflow: 'hidden',
    }}>
      <style>{styleBlock}</style>

      <svg
        ref={svgRef}
        viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="ss-region-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#85a03a" stopOpacity={isDark ? 0.28 : 0.18} />
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
            <circle key={h.key}
              cx={h.cx} cy={h.cy} r={h.r}
              fill="url(#ss-region-halo)"
              style={{ opacity: intensity.glow * 1.6 }}
            />
          ))}
        </g>

        <g>
          {borderDots.map(b => (
            <g key={b.id}>
              {b.dots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.x} cy={d.y}
                  r={b.uk ? 0.9 : 0.7}
                  fill={b.uk ? (isDark ? '#52525b' : '#a1a1aa') : (isDark ? '#3f3f46' : '#d4d4d8')}
                  opacity={b.uk ? 0.9 : 0.7}
                />
              ))}
            </g>
          ))}
        </g>

        <g>
          {dots.map((d, i) => {
            let brightness = 0;
            for (const c of CITIES) {
              if (!isHighlighted(c)) continue;
              const p = cityPoints[c.key];
              const dx = d.x - p.x, dy = d.y - p.y;
              const dist = Math.hypot(dx, dy);
              if (c.hub) {
                if (dist < 30) brightness = Math.max(brightness, 1 - dist / 30);
              } else {
                if (dist < 14) brightness = Math.max(brightness, (1 - dist / 14) * 0.85);
              }
            }
            const r = 0.9 + brightness * 0.7;
            const color = brightness > 0.05
              ? (brightness > 0.6 ? dotBright : dotHighlight)
              : dotBase;
            const opacity = brightness > 0.05 ? 0.65 + brightness * 0.35 : 0.55;
            return (
              <circle key={i} cx={d.x} cy={d.y} r={r} fill={color} opacity={opacity} />
            );
          })}
        </g>

        <g>
          {activeArcs.map((a, i) => {
            const A = cityPoints[a.from];
            const B = cityPoints[a.to];
            const { d } = arcPath(A, B);
            const isPrimary = !!a.primary;
            const isUk = !!a.uk;
            const lw = intensity.lineW * (isPrimary ? 1.0 : isUk ? 0.6 : 0.8);
            const col = isPrimary ? arcBright : arcColor;
            return (
              <g key={`${a.from}-${a.to}-${i}`}>
                <path d={d} stroke={col} strokeWidth={lw * 3} fill="none"
                      strokeLinecap="round" filter="url(#ss-arc-glow)"
                      opacity={intensity.glow * (isUk ? 0.5 : 1)} />
                <path d={d} stroke={col} strokeWidth={lw} fill="none"
                      strokeLinecap="round" opacity={intensity.arc * (isUk ? 0.55 : 1)} />
                {!reducedMotion && (
                  <path d={d} stroke={pulseCore} strokeWidth={lw * 0.6} fill="none"
                        strokeLinecap="round" className="ss-arc-flow"
                        opacity={intensity.pulse * (isPrimary ? 0.85 : isUk ? 0.35 : 0.55)}
                        style={{ animationDelay: `${(i * 0.25) % 1.6}s` }} />
                )}
                {!reducedMotion && !isUk && (
                  <circle r={isPrimary ? 1.4 : 1.0} fill={pulseCore} opacity={intensity.pulse}
                          filter="url(#ss-pulse-glow)">
                    <animateMotion dur={`${isPrimary ? 3.2 : 4.2}s`} repeatCount="indefinite"
                                   begin={`${i * 0.3}s`} path={d} rotate="auto" />
                  </circle>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
