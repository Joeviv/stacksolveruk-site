// File: src/components/hero/HeroArtifacts.tsx
// ERP dashboard mock + capability strip — English only.
import { useState, type ReactNode, type CSSProperties, cloneElement, isValidElement } from 'react';

const SvgIcon = ({ children, size = 18 }: { children: ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const IconActivity = () => <SvgIcon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></SvgIcon>;
const IconShield   = () => <SvgIcon><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></SvgIcon>;
const IconUser     = () => <SvgIcon><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></SvgIcon>;
const IconBranch   = () => <SvgIcon><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v2c0 3 3 6 6 6M18 8v2c0 3-3 6-6 6"/></SvgIcon>;
const IconDatabase = () => <SvgIcon><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></SvgIcon>;
const IconCpu      = () => <SvgIcon><rect x="5" y="5" width="14" height="14" rx="1.5"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></SvgIcon>;
const IconApple    = () => <SvgIcon><path d="M16 8c0-2 1.5-3.5 3.5-3.5M12.5 21c-2.5 0-3.5-1.5-5-4s-2.5-8 1-10c2-1 4 0 4.5 1 .5-1 2.5-2 4.5-1 3.5 2 2.5 7.5 1 10-1.5 2.5-2.5 4-5 4"/></SvgIcon>;

interface FadeRevealProps { children: ReactNode; restOpacity?: number; style?: CSSProperties; }
export function FadeReveal({ children, restOpacity = 0.28, style }: FadeRevealProps) {
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

interface ERPDashboardMockProps { theme?: 'dark' | 'light'; lang?: 'en'; }
export function ERPDashboardMock({ theme = 'dark' }: ERPDashboardMockProps) {
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
    { icon: <IconActivity />, title: 'Finance',      desc: 'Daily close ✓',       status: 'ok' },
    { icon: <IconShield />,   title: 'GRC',          desc: '0 pending alerts',    status: 'ok' },
    { icon: <IconUser />,     title: 'HR',           desc: 'Payroll current',     status: 'ok' },
    { icon: <IconBranch />,   title: 'Projects',     desc: '3 in progress',       status: 'warn' },
    { icon: <IconDatabase />, title: 'Supply Chain', desc: 'Optimal stock',       status: 'ok' },
    { icon: <IconCpu />,      title: 'Local AI',     desc: 'Agents active',       status: 'ok' },
  ];
  const footer = { processes: 'processes', tasks: 'tasks today', toast: 'Cyber-first GRC', toastSub: 'Auditable by design' };

  return (
    <div style={{
      width: 300,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 10,
      boxShadow: isDark
        ? '0 24px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(133,160,58,0.18) inset'
        : '0 24px 60px -20px rgba(24,24,27,0.18)',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ background: headerBg, borderBottom: `1px solid ${border}`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#ef4444' }} />
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#f59e0b' }} />
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#22c55e' }} />
        </div>
        <div style={{ fontSize: 11, color: muted, letterSpacing: '-0.01em' }}>
          Stacksolver UK ERP · <span style={{ color: strong, fontWeight: 500 }}>Dashboard</span>
        </div>
      </div>
      <div style={{ padding: 10, background: innerBg, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ background: tileBg, border: `1px solid ${border}`, borderRadius: 7, padding: 10, position: 'relative' }}>
            <div style={{ width: 22, height: 22, borderRadius: 4, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted, marginBottom: 8 }}>
              {isValidElement(t.icon) ? cloneElement(t.icon as any, { size: 13 }) : t.icon}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: strong, letterSpacing: '-0.01em' }}>{t.title}</div>
            <div style={{ fontSize: 10, color: muted, marginTop: 2 }}>{t.desc}</div>
            <span style={{
              position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: 9999,
              background: t.status === 'warn' ? '#f59e0b' : '#22c55e',
              boxShadow: t.status === 'warn' ? '0 0 8px rgba(245,158,11,0.7)' : '0 0 8px rgba(34,197,94,0.7)',
            }} />
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px solid ${border}`, background: innerBg, padding: '8px 12px', display: 'flex', gap: 16, position: 'relative' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: strong, letterSpacing: '-0.02em' }}>247</div>
          <div style={{ fontSize: 9, color: muted }}>{footer.processes}</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: strong, letterSpacing: '-0.02em' }}>38</div>
          <div style={{ fontSize: 9, color: muted }}>{footer.tasks}</div>
        </div>
        <div style={{
          position: 'absolute', right: -8, bottom: -14,
          background: surface, border: `1px solid ${border}`,
          borderRadius: 8, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: isDark ? '0 10px 24px -8px rgba(0,0,0,0.6)' : '0 10px 24px -8px rgba(24,24,27,0.15)',
        }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: 'rgba(133,160,58,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: olive }}>
            <SvgIcon size={11}><polyline points="20 6 9 17 4 12"/></SvgIcon>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: strong, letterSpacing: '-0.01em' }}>{footer.toast}</div>
            <div style={{ fontSize: 9, color: muted }}>{footer.toastSub}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Cap { icon: ReactNode; title: string; desc: string; tag: string; href: string; }
const CAPS: Cap[] = [
  { icon: <IconShield />,   title: 'Cyber Security',           desc: 'Cyber Essentials Plus, penetration testing, vCISO and incident response — for UK businesses entering corporate procurement.', tag: 'OUR SPECIALTY', href: '/services/cyber' },
  { icon: <IconCpu />,      title: 'AI Engineering',           desc: 'Sovereign AI inside your perimeter. Ethical by default. ISO 42001 ready, EU AI Act aligned.',                                tag: 'SOVEREIGN · ETHICAL · AUDITABLE', href: '/services/ai' },
  { icon: <IconDatabase />, title: 'Areas + AI',               desc: 'AI embedded in the function — Procurement + AI and HR + AI as our anchor practices.',                                       tag: 'PROCUREMENT · HR · FINANCE', href: '/services/areas-ai' },
  { icon: <IconApple />,    title: 'NIS2 · DORA · TPRM',       desc: 'EU regulatory tailwind 2026–2027. Ready your operations for European supervision and supply chain risk.',                    tag: 'RISK & RESILIENCE', href: '/services/risk-resilience' },
];

interface CapabilityStripProps { lang?: 'en'; theme?: 'dark' | 'light'; }
export function CapabilityStrip({ theme = 'dark' }: CapabilityStripProps) {
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
          transition: 'background 220ms, transform 220ms',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = isDark ? 'rgba(133,160,58,0.10)' : 'rgba(133,160,58,0.06)';
          }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          className="ss-cap-card"
        >
          <div style={{ color: iconCol, marginBottom: 14, transition: 'color 220ms' }} className="ss-cap-icon">{c.icon}</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: strong, letterSpacing: '-0.01em', marginBottom: 6 }}>{c.title}</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: muted, marginBottom: 14, textWrap: 'pretty' as 'pretty' }}>{c.desc}</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: tagCol }}>{c.tag}</div>
          <div style={{
            position: 'absolute', right: 16, top: 18, fontSize: 12, color: olive, opacity: 0,
            transition: 'opacity 220ms',
          }} className="ss-cap-arrow">→</div>
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
