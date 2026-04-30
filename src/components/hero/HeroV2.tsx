// File: src/components/hero/HeroV2.tsx
// Hero — full-width Europe map on top, copy + capability strip below, metric strip at the bottom.
// New positioning: AI · Cyber Security · Procurement (Claude Design handoff 2026-04-29).
import { useEffect, useRef, useState } from 'react';
import HeroDotMap, { CITIES } from './HeroDotMap';
import {
  ERPDashboardMock,
  CapabilityStrip,
  FadeReveal,
  HeroAnchor,
  CityMarker,
} from './HeroArtifacts';

const HERO_COPY = {
  eyebrow: 'AI · CYBER SECURITY · PROCUREMENT',
  headline: 'AI, cyber and procurement, embedded into the systems that already run your business.',
  sub: 'A British technology partner working across regulated industries — financial services, healthcare, manufacturing and the public sector. We make AI accountable, networks defensible, and procurement faster.',
  primary: 'Book a discovery call',
  secondary: 'See our method',
  metrics: [
    'UK-based, EU-wide delivery',
    '18+ years in regulated systems',
    'ISO 27001 · Cyber Essentials Plus',
  ],
};

export default function HeroV2() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const mapSvgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    const readTheme = () => {
      const isDark = body?.classList.contains('dark') || root.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    readTheme();
    const obs = new MutationObserver(readTheme);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    if (body) obs.observe(body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === 'dark';
  const olive       = '#85a03a';
  const oliveBright = isDark ? '#a6c04d' : '#85a03a';
  const strong      = isDark ? '#fafafa' : '#18181b';
  const muted       = isDark ? '#a1a1aa' : '#52525b';
  const bg          = isDark ? '#0a0a0a' : '#ffffff';
  const bgSoft      = isDark ? '#101010' : '#fafafa';
  const border      = isDark ? '#27272a' : '#e4e4e7';

  return (
    <section style={{ position: 'relative', background: bg, color: strong, overflow: 'hidden' }}>
      {/* MAP BAND — full-width, top of the hero */}
      <div style={{ position: 'relative', width: '100%', height: 'min(58vh, 620px)', minHeight: 380 }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <HeroDotMap
            theme={theme}
            arcDensity="all"
            arcIntensity="normal"
            svgRefOut={mapSvgRef}
          />
        </div>

        {/* Geo-anchored DOM overlays — same box as map, above SVG */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
          {CITIES.map(city => (
            <HeroAnchor key={city.key} svgRef={mapSvgRef} lat={city.lat} lon={city.lon}>
              <CityMarker city={city} theme={theme} />
            </HeroAnchor>
          ))}

          {/* ERP mock anchored over Atlantic, top-left of map */}
          <HeroAnchor svgRef={mapSvgRef} lat={58} lon={-10}>
            <div className="ss-erp-mock">
              <FadeReveal restOpacity={0.32}>
                <ERPDashboardMock theme={theme} />
              </FadeReveal>
            </div>
          </HeroAnchor>
        </div>

        {/* Bottom fade into bg so transition into copy is soft */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, zIndex: 2,
          pointerEvents: 'none',
          background: isDark
            ? 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        }} />
      </div>

      {/* COPY BAND — below the map */}
      <div style={{
        position: 'relative', zIndex: 3, width: '100%',
        maxWidth: 1280, margin: '0 auto', padding: '40px 32px 72px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="ss-hero-grid">
          <div style={{ maxWidth: 880 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: oliveBright, marginBottom: 24,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: 9999, background: oliveBright,
                boxShadow: isDark ? `0 0 10px ${oliveBright}` : 'none',
              }} />
              {HERO_COPY.eyebrow}
            </div>

            <h1 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(36px, 4.4vw, 60px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              fontWeight: 600,
              margin: '0 0 24px',
              color: strong,
              textWrap: 'balance' as 'balance',
            }}>
              {HERO_COPY.headline}
            </h1>

            <p style={{
              fontSize: 19, lineHeight: 1.55, color: muted,
              margin: '0 0 32px', maxWidth: 720,
              textWrap: 'pretty' as 'pretty',
            }}>
              {HERO_COPY.sub}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 22px',
                background: olive, color: '#0a0a0a',
                borderRadius: 8,
                fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em',
                textDecoration: 'none',
                border: `1px solid ${olive}`,
                boxShadow: isDark
                  ? '0 0 0 1px rgba(133,160,58,0.35) inset, 0 0 32px rgba(133,160,58,0.28), 0 2px 0 rgba(0,0,0,0.2)'
                  : '0 1px 2px rgba(24,24,27,0.08), 0 0 0 1px rgba(109,133,48,0.2)',
                transition: 'background 200ms',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#94b043'; }}
                onMouseLeave={e => { e.currentTarget.style.background = olive; }}
              >
                {HERO_COPY.primary} <span aria-hidden>→</span>
              </a>
              <a href="/method" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '14px 22px',
                background: 'transparent', color: strong,
                borderRadius: 8,
                fontSize: 15, fontWeight: 500, textDecoration: 'none',
                border: `1px solid ${olive}`,
                transition: 'background 200ms',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(133,160,58,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                {HERO_COPY.secondary}
              </a>
            </div>
          </div>

          <div>
            <CapabilityStrip theme={theme} />
          </div>
        </div>
      </div>

      {/* METRIC STRIP */}
      <div style={{
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        background: bgSoft,
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto', padding: '0 32px',
          minHeight: 72, display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 0, flexWrap: 'wrap',
        }}>
          {HERO_COPY.metrics.map((m, i) => (
            <div key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <div style={{
                padding: '14px 32px',
                fontSize: 14, fontWeight: 500, color: muted,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.005em',
                whiteSpace: 'nowrap',
              }}>
                {m}
              </div>
              {i < HERO_COPY.metrics.length - 1 && (
                <div style={{ width: 1, height: 24, background: border }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ss-cm-pulse {
          0%   { transform: scale(0.8); opacity: 0.85; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (max-width: 820px) {
          .ss-erp-mock { display: none !important; }
        }
        @media (max-width: 900px) {
          .ss-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
