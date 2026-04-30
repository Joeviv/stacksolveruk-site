// File: src/components/hero/HeroArtifacts.tsx
// ERP dashboard mock + HeroAnchor + CityMarker + CapabilityStrip — English only.
import {
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
  cloneElement,
  isValidElement,
  type MutableRefObject,
} from 'react';
import type { City } from './HeroDotMap';

const SvgIcon = ({ children, size = 18 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const IconActivity = () => <SvgIcon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></SvgIcon>;
const IconShield   = () => <SvgIcon><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></SvgIcon>;
const IconUser     = () => <SvgIcon><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></SvgIcon>;
const IconBranch   = () => <SvgIcon><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v2c0 3 3 6 6 6M18 8v2c0 3-3 6-6 6"/></SvgIcon>;
const IconDatabase = () => <SvgIcon><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></SvgIcon>;
const IconCpu      = () => <SvgIcon><rect x="5" y="5" width="14" height="14" rx="1.5"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></SvgIcon>;

// ---------- FadeReveal ----------
interface FadeRevealProps { children: ReactNode; restOpacity?: number; style?: CSSProperties; }
export function FadeReveal({ children, restOpacity = 0.32, style }: FadeRevealProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: hover ? 1 : restOpacity,
        filter: hover ? 'none' : 'saturate(0.6)',
        transition: 'opacity 360ms cubic-bezier(0.16,1,0.3,1), filter 360ms cubic-bezier(0.16,1,0.3,1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------- ERP Dashboard Mock (compact 260px wide, 6 tiles) ----------
interface ERPDashboardMockProps { theme?: 'dark' | 'light'; }
export function ERPDashboardMock({ theme = 'light' }: ERPDashboardMockProps) {
  const isDark = theme === 'dark';
  const surface  = isDark ? '#18181b' : '#ffffff';
  const innerBg  = isDark ? '#0f0f11' : '#ffffff';
  const tileBg   = isDark ? '#18181b' : '#fafafa';
  const border   = isDark ? '#27272a' : '#e4e4e7';
  const headerBg = isDark ? '#141416' : '#f4f4f5';
  const strong   = isDark ? '#fafafa' : '#18181b';
  const muted    = isDark ? '#a1a1aa' : '#71717a';
  const iconBg   = isDark ? '#1f1f23' : '#f4f4f5';
  const olive    = '#85a03a';

  const tiles = [
    { icon: <IconCpu />,      title: 'AI Copilots',    desc: '14 agents live',     status: 'ok' },
    { icon: <IconShield />,   title: 'Cyber Posture',  desc: 'No critical issues', status: 'ok' },
    { icon: <IconBranch />,   title: 'Procurement',    desc: '23 RFQs in flight',  status: 'warn' },
    { icon: <IconActivity />, title: 'Operations',     desc: 'All systems normal', status: 'ok' },
    { icon: <IconDatabase />, title: 'Data Estate',    desc: 'Lineage 100%',       status: 'ok' },
    { icon: <IconUser />,     title: 'Workforce',      desc: 'Access reviewed',    status: 'ok' },
  ];

  return (
    <div style={{
      width: 260,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 10,
      boxShadow: isDark
        ? '0 24px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(133,160,58,0.18) inset'
        : '0 24px 60px -20px rgba(24,24,27,0.18)',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: headerBg, borderBottom: `1px solid ${border}`,
        padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#ef4444' }} />
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#f59e0b' }} />
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#22c55e' }} />
        </div>
        <div style={{ fontSize: 10, color: muted, letterSpacing: '-0.01em' }}>
          StackSolver Console · <span style={{ color: strong, fontWeight: 500 }}>Operations</span>
        </div>
      </div>

      <div style={{
        padding: 8, background: innerBg,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
      }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            background: tileBg, border: `1px solid ${border}`,
            borderRadius: 7, padding: 8, position: 'relative',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4, background: iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: muted, marginBottom: 6,
            }}>
              {isValidElement(t.icon) ? cloneElement(t.icon as any, { size: 12 }) : t.icon}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: strong, letterSpacing: '-0.01em' }}>{t.title}</div>
            <div style={{ fontSize: 9, color: muted, marginTop: 1 }}>{t.desc}</div>
            <span style={{
              position: 'absolute', top: 8, right: 8,
              width: 5, height: 5, borderRadius: 9999,
              background: t.status === 'warn' ? '#f59e0b' : '#22c55e',
              boxShadow: t.status === 'warn'
                ? '0 0 8px rgba(245,158,11,0.7)'
                : '0 0 8px rgba(34,197,94,0.7)',
            }} />
          </div>
        ))}
      </div>

      <div style={{
        borderTop: `1px solid ${border}`, background: innerBg,
        padding: '7px 10px', display: 'flex', gap: 14, position: 'relative',
      }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: strong, letterSpacing: '-0.02em' }}>247</div>
          <div style={{ fontSize: 8, color: muted }}>workflows</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: strong, letterSpacing: '-0.02em' }}>38</div>
          <div style={{ fontSize: 8, color: muted }}>tasks today</div>
        </div>
        <div style={{
          position: 'absolute', right: -8, bottom: -14,
          background: surface, border: `1px solid ${border}`,
          borderRadius: 8, padding: '5px 8px',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: isDark
            ? '0 10px 24px -8px rgba(0,0,0,0.6)'
            : '0 10px 24px -8px rgba(24,24,27,0.15)',
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: 4,
            background: 'rgba(133,160,58,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: olive,
          }}>
            <SvgIcon size={10}><polyline points="20 6 9 17 4 12"/></SvgIcon>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 600, color: strong, letterSpacing: '-0.01em' }}>ISO 27001</div>
            <div style={{ fontSize: 8, color: muted }}>Continuous audit</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- HeroAnchor ----------
// Renders children locked to a (lat, lon) point inside a parent SVG ref.
// Tracks the SVG's live viewBox + getBoundingClientRect via ResizeObserver.
const HA_VW = 1440;
const HA_VH = 720;

interface HeroAnchorProps {
  svgRef: MutableRefObject<SVGSVGElement | null>;
  lat: number;
  lon: number;
  children: ReactNode;
  style?: CSSProperties;
}
export function HeroAnchor({ svgRef, lat, lon, children, style }: HeroAnchorProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const projX = ((lon + 180) / 360) * HA_VW;
    const projY = ((90 - lat) / 180) * HA_VH;

    const update = () => {
      const svg = svgRef?.current;
      if (!svg) return;
      const vb = svg.viewBox.baseVal;
      const vbX = vb.x, vbY = vb.y, vbW = vb.width, vbH = vb.height;
      if (!vbW || !vbH) return;
      const rect = svg.getBoundingClientRect();
      const scale = Math.min(rect.width / vbW, rect.height / vbH);
      const renderedW = vbW * scale;
      const renderedH = vbH * scale;
      const padX = (rect.width - renderedW) / 2;
      const padY = (rect.height - renderedH) / 2;
      setPos({
        x: padX + (projX - vbX) * scale,
        y: padY + (projY - vbY) * scale,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    if (svgRef?.current) ro.observe(svgRef.current);
    window.addEventListener('resize', update);
    const t = setTimeout(update, 0);
    return () => { ro.disconnect(); window.removeEventListener('resize', update); clearTimeout(t); };
  }, [svgRef, lat, lon]);

  if (!pos) return null;
  return (
    <div style={{
      position: 'absolute',
      left: pos.x, top: pos.y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'auto',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ---------- CityMarker ----------
interface CityMarkerProps { city: City; theme?: 'dark' | 'light'; }
export function CityMarker({ city, theme = 'light' }: CityMarkerProps) {
  const isDark = theme === 'dark';
  const [hover, setHover] = useState(false);
  const isHub = city.hub === true;
  const olive       = '#85a03a';
  const oliveBright = isDark ? '#a6c04d' : '#6d8530';
  const labelStrong = isDark ? '#fafafa' : '#18181b';
  const labelMuted  = isDark ? '#d4d4d8' : '#3f3f46';
  const tooltipBg   = isDark ? '#18181b' : '#ffffff';
  const tooltipBd   = isDark ? '#27272a' : '#e4e4e7';
  const tooltipSub  = isDark ? '#a1a1aa' : '#52525b';

  const dotSize = isHub ? 12 : 7;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 4,
        cursor: 'pointer',
      }}
    >
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: isHub ? 13 : 11,
        fontWeight: isHub ? 700 : 600,
        letterSpacing: '-0.01em',
        color: isHub ? labelStrong : labelMuted,
        whiteSpace: 'nowrap',
        textShadow: isDark
          ? '0 0 4px rgba(10,10,10,0.95), 0 0 4px rgba(10,10,10,0.95), 0 1px 2px rgba(0,0,0,0.6)'
          : '0 0 4px rgba(255,255,255,0.95), 0 0 4px rgba(255,255,255,0.95)',
        pointerEvents: 'none',
      }}>
        {city.name}
      </div>

      <div style={{ position: 'relative', width: dotSize, height: dotSize }}>
        {isHub && (
          <span style={{
            position: 'absolute', inset: -8,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${olive}66 0%, ${olive}00 70%)`,
            animation: 'ss-cm-pulse 2.4s ease-out infinite',
            pointerEvents: 'none',
          }} />
        )}
        {!isHub && (
          <span style={{
            position: 'absolute', inset: -3,
            borderRadius: 9999,
            border: `1px solid ${olive}99`,
            opacity: 0.6,
          }} />
        )}
        <span style={{
          position: 'absolute', inset: 0,
          borderRadius: 9999,
          background: isHub ? '#fff' : oliveBright,
          boxShadow: isHub
            ? `0 0 0 2px ${olive}, 0 0 12px ${oliveBright}, 0 0 24px ${olive}88`
            : `0 0 0 1px ${isDark ? 'rgba(10,10,10,0.6)' : 'rgba(255,255,255,0.85)'}, 0 0 6px ${oliveBright}88`,
        }} />
      </div>

      {hover && (
        <div role="tooltip" style={{
          position: 'absolute', left: '50%', bottom: 'calc(100% + 14px)',
          transform: 'translateX(-50%)',
          background: tooltipBg, border: `1px solid ${tooltipBd}`,
          borderRadius: 10, padding: '8px 12px', minWidth: 160,
          boxShadow: isDark
            ? '0 16px 40px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(133,160,58,0.25) inset'
            : '0 12px 32px -8px rgba(24,24,27,0.18)',
          pointerEvents: 'none', zIndex: 20,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
            color: labelStrong, letterSpacing: '-0.01em',
          }}>
            <span>{city.name}</span>
            <span style={{ fontSize: 11, color: tooltipSub, fontWeight: 500 }}>· {city.country}</span>
          </div>
          <div style={{
            marginTop: 4,
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: tooltipSub, letterSpacing: '0.02em',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ color: oliveBright, fontWeight: 600 }}>{city.population}</span>
            <span>population</span>
            {city.hub && <span style={{ color: oliveBright, marginLeft: 4 }}>· hub</span>}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- CapabilityStrip ----------
interface Cap { icon: ReactNode; title: string; desc: string; tag: string; href: string; }
const CAPS: Cap[] = [
  { icon: <IconCpu />,      title: 'Applied AI',      desc: 'Practical AI built into the systems you already run — copilots, decision support, document automation, with full auditability.', tag: 'AGENTS · RAG · EVALS',     href: '/services/ai' },
  { icon: <IconShield />,   title: 'Cyber Security',  desc: 'Network defence, identity hardening, incident response and assurance against ISO 27001 and Cyber Essentials Plus.',                tag: 'SOC · MDR · ASSURANCE',    href: '/services/cyber' },
  { icon: <IconBranch />,   title: 'Procurement',     desc: 'Sourcing, supplier risk and contract intelligence — purpose-built for regulated industries and public-sector buyers.',             tag: 'CCS · GCLOUD · DPS',       href: '/services/areas-ai/procurement-ai' },
  { icon: <IconDatabase />, title: 'Industry Stacks', desc: 'Reference implementations for financial services, healthcare, manufacturing and the public sector. Compliance-first.',            tag: 'FCA · NHS · MOD · GDS',    href: '/industries' },
];

interface CapabilityStripProps { theme?: 'dark' | 'light'; }
export function CapabilityStrip({ theme = 'light' }: CapabilityStripProps) {
  const isDark = theme === 'dark';
  const items = CAPS;
  const border = isDark ? '#27272a' : '#e4e4e7';
  const surface = isDark ? 'rgba(24,24,27,0.72)' : 'rgba(255,255,255,0.78)';
  const strong  = isDark ? '#fafafa' : '#18181b';
  const muted   = isDark ? '#a1a1aa' : '#52525b';
  const iconCol = isDark ? '#a1a1aa' : '#52525b';
  const tagCol  = isDark ? '#71717a' : '#71717a';
  const olive   = isDark ? '#a6c04d' : '#6d8530';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      border: `1px solid ${border}`,
      borderRadius: 12,
      background: surface,
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      overflow: 'hidden',
    }} className="ss-cap-strip">
      {items.map((c, i) => (
        <a key={i} href={c.href} style={{
          padding: '20px 20px 22px',
          borderRight: i < items.length - 1 ? `1px solid ${border}` : 'none',
          minWidth: 0, textDecoration: 'none', color: 'inherit',
          position: 'relative',
          transition: 'background 220ms',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(133,160,58,0.10)' : 'rgba(133,160,58,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          className="ss-cap-card"
        >
          <div style={{ color: iconCol, marginBottom: 14, transition: 'color 220ms' }} className="ss-cap-icon">{c.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: strong, letterSpacing: '-0.01em', marginBottom: 6 }}>{c.title}</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: muted, marginBottom: 14, textWrap: 'pretty' as 'pretty' }}>{c.desc}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: tagCol }}>{c.tag}</div>
          <div style={{ position: 'absolute', right: 16, top: 18, fontSize: 12, color: olive, opacity: 0, transition: 'opacity 220ms' }} className="ss-cap-arrow">→</div>
        </a>
      ))}
      <style>{`
        .ss-cap-card:hover .ss-cap-arrow { opacity: 1 !important; }
        .ss-cap-card:hover .ss-cap-icon { color: ${olive} !important; }
        @media (max-width: 900px) {
          .ss-cap-strip { grid-template-columns: 1fr 1fr !important; }
          .ss-cap-strip a:nth-child(2) { border-right: none !important; }
          .ss-cap-strip a:nth-child(1),
          .ss-cap-strip a:nth-child(2) { border-bottom: 1px solid ${border} !important; }
        }
        @media (max-width: 560px) {
          .ss-cap-strip { grid-template-columns: 1fr !important; }
          .ss-cap-strip a { border-right: none !important; border-bottom: 1px solid ${border} !important; }
          .ss-cap-strip a:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}
