// File: src/data/serviceGuide.ts
// Home guide: six areas, one choice per question, rules and ranking. No AI, no network calls.
// validateGuide() fails the build if a rule points at a service that does not exist, at a service hidden
// from the home page, or if a service or area has no wireframe.

export type GuideService = {
  id: string;
  title: string;
  summary: string;
  href: string;
  section: string;
  features: string[];
  plan: { title: string; description: string }[];
};

export type Area = { id: string; label: string; hint: string };

export type Need = {
  id: string;
  area: string;
  label: string;
  define?: string;
  weights: Record<string, number>;
};

export type Choice = { id: string; label: string };

export type Boost = {
  when: { size?: string; sector?: string; eu?: string; urgent?: boolean; need?: string };
  reason: string;
  weights: Record<string, number>;
};

export type Answers = {
  area?: string;
  need?: string;
  size?: string;
  sector?: string;
  eu?: string;
  urgent?: boolean;
};

export type Suggestion = {
  service: GuideService;
  score: number;
  reasons: string[];
};

export type Motif =
  | 'shield' | 'target' | 'network' | 'neural' | 'seal' | 'radar' | 'stack'
  | 'globe' | 'pulse' | 'people' | 'flow' | 'bars' | 'matrix' | 'document';

// Services kept off the site for now. They stay in the catalogue (menuData.ts) for later.
export const HIDDEN_SERVICES = new Set([
  'ethical-ai-sandbox', 'private-rag', 'ai-governance-iso-42001', 'agentic-ai', 'ai-act-compliance',
  'procurement-ai', 'hr-ai', 'finance-ai', 'legal-ai', 'compliance-ai', 'iso-42001',
  'ai-system-assessment', 'ai-red-teaming', 'rag-security-review', 'agentic-ai-security',
  'lean-tier-mac-studio', 'production-tier-gpu', 'enterprise-tier-cluster', 'private-cloud-bedrock',
]);

export const AREAS: Area[] = [
  { id: 'cyber', label: 'Cyber Security', hint: 'Certify, test, respond' },
  { id: 'governance', label: 'Governance', hint: 'Oversight and accountability' },
  { id: 'risk', label: 'Risk', hint: 'Registers, suppliers, resilience' },
  { id: 'compliance', label: 'Compliance', hint: 'ISO, SOC 2, GDPR, NIS2' },
  { id: 'hr', label: 'HR & Recruitment', hint: 'Contracts, onboarding, payroll' },
  { id: 'systems', label: 'Business Systems', hint: 'ERP, FileMaker, support' },
];

export const NEEDS: Need[] = [
  // Cyber Security
  { id: 'tender', area: 'cyber', label: 'A client or tender asks for Cyber Essentials',
    define: 'A UK Government-backed certification of five basic security controls. Cyber Essentials Plus adds an independent technical audit.',
    weights: { 'cyber-essentials-plus': 5, 'gap-analysis': 1 } },
  { id: 'test', area: 'cyber', label: 'We want our defences tested',
    define: 'A penetration test is an authorised, simulated attack that finds weaknesses before real attackers do.',
    weights: { 'penetration-testing': 5, 'security-architecture': 1, 'tlpt-testing': 1 } },
  { id: 'incident', area: 'cyber', label: 'We have had an incident, or fear one',
    weights: { 'incident-response': 5, 'security-awareness': 1, 'penetration-testing': 1 } },
  { id: 'leadership', area: 'cyber', label: 'We need senior security leadership',
    define: 'A virtual CISO is a part-time Chief Information Security Officer: senior leadership without a full-time hire.',
    weights: { 'vciso-retainer': 5, 'risk-assessment': 1 } },
  { id: 'people', area: 'cyber', label: 'Phishing and staff behaviour worry us',
    weights: { 'security-awareness': 5 } },
  { id: 'architecture', area: 'cyber', label: 'We are redesigning our network, identity or cloud',
    weights: { 'security-architecture': 5 } },

  // Governance
  { id: 'baseline', area: 'governance', label: 'We do not know where we stand',
    weights: { 'gap-analysis': 5, 'risk-assessment': 2 } },
  { id: 'board', area: 'governance', label: 'The board wants oversight of security',
    weights: { 'vciso-retainer': 4, 'risk-assessment': 2, 'internal-audit': 1 } },
  { id: 'audit', area: 'governance', label: 'We need an internal audit before certification',
    define: 'An internal audit checks that your management system works as written, before the certification body arrives.',
    weights: { 'internal-audit': 5, 'gap-analysis': 1 } },
  { id: 'dpo', area: 'governance', label: 'We need a Data Protection Officer',
    define: 'A Data Protection Officer oversees data protection. UK GDPR requires one for some organisations.',
    weights: { 'dpo-as-service': 5, 'gdpr-uk-gdpr': 2 } },

  // Risk
  { id: 'register', area: 'risk', label: 'We need a risk register the board can trust',
    define: 'A risk register is a living list of your key risks, with owners, ratings and treatments.',
    weights: { 'risk-assessment': 5 } },
  { id: 'suppliers', area: 'risk', label: 'We depend on suppliers we cannot see into',
    define: 'Third-party risk management is how you assess and monitor the suppliers your business depends on.',
    weights: { 'tprm-programme': 5 } },
  { id: 'dora', area: 'risk', label: 'We are a financial entity, or we supply one',
    define: 'DORA is the EU Digital Operational Resilience Act. It applies to financial entities and their critical ICT providers from January 2025.',
    weights: { 'dora-readiness': 5, 'tlpt-testing': 1, 'operational-resilience-uk': 1 } },
  { id: 'opres', area: 'risk', label: 'Our regulator expects operational resilience',
    define: 'UK operational resilience rules ask firms to keep important business services within set impact tolerances.',
    weights: { 'operational-resilience-uk': 5, 'iso-22301-bcm': 1 } },
  { id: 'continuity', area: 'risk', label: 'We need a business continuity plan',
    define: 'Business continuity keeps critical activities running during and after a disruption. ISO 22301 is the standard.',
    weights: { 'iso-22301-bcm': 5 } },

  // Compliance
  { id: 'ce', area: 'compliance', label: 'We need Cyber Essentials',
    define: 'A UK Government-backed certification of five basic security controls. Cyber Essentials Plus adds an independent technical audit.',
    weights: { 'cyber-essentials-plus': 5, 'gap-analysis': 1 } },
  { id: 'iso27001', area: 'compliance', label: 'Customers ask for ISO 27001',
    define: 'ISO/IEC 27001 is the international standard for an information security management system, certified by accredited bodies.',
    weights: { 'iso-27001': 5, 'gap-analysis': 2, 'internal-audit': 1 } },
  { id: 'soc2', area: 'compliance', label: 'US customers ask for SOC 2',
    define: 'SOC 2 is a US attestation report on security controls, issued by a licensed CPA firm.',
    weights: { 'soc-2': 5, 'gap-analysis': 1 } },
  { id: 'gdpr', area: 'compliance', label: 'We handle personal data and need GDPR in order',
    define: 'UK GDPR and EU GDPR are the laws on how organisations collect and use personal data.',
    weights: { 'gdpr-uk-gdpr': 5, 'dpo-as-service': 2, 'iso-27701-privacy': 1 } },
  { id: 'nis2', area: 'compliance', label: 'We operate in the EU and NIS2 may apply',
    define: 'NIS2 is the EU cyber security directive. It widens the sectors in scope and makes management accountable.',
    weights: { 'nis2-readiness': 5 } },

  // HR & Recruitment
  { id: 'hr-docs', area: 'hr', label: 'We need contracts, policies and a handbook',
    weights: { 'hr-advisory': 5 } },
  { id: 'onboarding', area: 'hr', label: 'We need onboarding and offboarding done properly',
    weights: { 'hr-onboarding': 5, 'hr-advisory': 1 } },
  { id: 'payroll', area: 'hr', label: 'We need payroll, pensions and benefits coordinated',
    weights: { 'hr-payroll-benefits': 5 } },

  // Business Systems
  { id: 'erp', area: 'systems', label: 'Our ERP or business systems need replacing',
    weights: { 'erp-consulting-migration': 5, 'claris-filemaker-erp': 2 } },
  { id: 'own-system', area: 'systems', label: 'We want a custom system that we own',
    weights: { 'claris-filemaker-erp': 5 } },
  { id: 'systems-support', area: 'systems', label: 'Our existing systems need support',
    weights: { 'business-systems-support': 5 } },
];

export const SIZES: Choice[] = [
  { id: 'small', label: '1–49' },
  { id: 'medium', label: '50–249' },
  { id: 'large', label: '250+' },
];

export const SECTORS: Choice[] = [
  { id: 'finance', label: 'Financial services' },
  { id: 'health', label: 'Healthcare' },
  { id: 'professional', label: 'Professional services' },
  { id: 'tech', label: 'Technology' },
  { id: 'other', label: 'Other' },
];

export const EU: Choice[] = [
  { id: 'no', label: 'UK only' },
  { id: 'yes', label: 'UK and EU' },
];

// Boosts only adjust services the visitor's need already selected: they never add unrelated ones.
export const BOOSTS: Boost[] = [
  { when: { sector: 'finance' }, reason: 'Financial services',
    weights: { 'dora-readiness': 2, 'tlpt-testing': 2, 'operational-resilience-uk': 1 } },
  { when: { sector: 'health' }, reason: 'Healthcare', weights: { 'gdpr-uk-gdpr': 1, 'dpo-as-service': 1 } },
  { when: { eu: 'yes' }, reason: 'Works in the EU', weights: { 'nis2-readiness': 2, 'gdpr-uk-gdpr': 1 } },
  { when: { size: 'small' }, reason: 'Team of 1–49', weights: { 'cyber-essentials-plus': 1, 'vciso-retainer': 1 } },
  { when: { size: 'large' }, reason: 'Team of 250+', weights: { 'internal-audit': 1 } },
  { when: { urgent: true, need: 'incident' }, reason: 'It is urgent', weights: { 'incident-response': 5 } },
];

export const MOTIF_BY_AREA: Record<string, Motif> = {
  cyber: 'shield', governance: 'radar', risk: 'matrix', compliance: 'seal', hr: 'people', systems: 'stack',
};

export const MOTIF_BY_SERVICE: Record<string, Motif> = {
  'cyber-essentials-plus': 'shield', 'penetration-testing': 'target', 'vciso-retainer': 'radar',
  'security-architecture': 'network', 'incident-response': 'pulse', 'security-awareness': 'people',
  'ethical-ai-sandbox': 'stack', 'private-rag': 'neural', 'ai-governance-iso-42001': 'seal', 'agentic-ai': 'network',
  'ai-act-compliance': 'globe', 'procurement-ai': 'flow', 'hr-ai': 'people', 'finance-ai': 'bars', 'legal-ai': 'document',
  'compliance-ai': 'seal', 'gap-analysis': 'radar', 'risk-assessment': 'matrix', 'dpo-as-service': 'document',
  'internal-audit': 'matrix', 'iso-27001': 'seal', 'iso-42001': 'seal', 'iso-27701-privacy': 'shield',
  'iso-22301-bcm': 'pulse', 'soc-2': 'seal', 'gdpr-uk-gdpr': 'document', 'nis2-readiness': 'globe',
  'dora-readiness': 'globe', 'tlpt-testing': 'target', 'tprm-programme': 'network', 'operational-resilience-uk': 'pulse',
  'ai-system-assessment': 'target', 'ai-red-teaming': 'target', 'rag-security-review': 'neural',
  'agentic-ai-security': 'network', 'lean-tier-mac-studio': 'stack', 'production-tier-gpu': 'stack',
  'enterprise-tier-cluster': 'stack', 'private-cloud-bedrock': 'globe', 'claris-filemaker-erp': 'stack',
  'erp-consulting-migration': 'flow', 'business-systems-support': 'pulse', 'hr-advisory': 'document',
  'hr-onboarding': 'people', 'hr-payroll-benefits': 'bars',
};

// Contact form topics (ContactForm.tsx). Services without a matching topic fall back to 'other'.
const TOPIC_BY_SERVICE: Record<string, string> = {
  'cyber-essentials-plus': 'cyber-essentials-plus', 'penetration-testing': 'penetration-testing',
  'vciso-retainer': 'vciso', 'security-architecture': 'security-architecture',
  'incident-response': 'incident-response', 'security-awareness': 'security-awareness',
  'gap-analysis': 'grc', 'risk-assessment': 'grc', 'internal-audit': 'grc', 'dpo-as-service': 'dpo',
  'iso-27001': 'iso-27001', 'iso-27701-privacy': 'gdpr', 'iso-22301-bcm': 'operational-resilience',
  'soc-2': 'soc-2', 'gdpr-uk-gdpr': 'gdpr', 'nis2-readiness': 'nis2', 'dora-readiness': 'dora',
  'tlpt-testing': 'dora', 'tprm-programme': 'tprm', 'operational-resilience-uk': 'operational-resilience',
};

export function contactTopic(serviceId: string): string {
  return TOPIC_BY_SERVICE[serviceId] ?? 'other';
}

// Where each service lives: exactly one area per service (the Services page anchors on it), plus related links.
export const AREA_SERVICES: Record<string, { services: string[]; related: string[] }> = {
  cyber: { services: ['cyber-essentials-plus', 'penetration-testing', 'vciso-retainer', 'security-architecture', 'incident-response', 'security-awareness'], related: [] },
  governance: { services: ['gap-analysis', 'internal-audit', 'dpo-as-service'], related: ['vciso-retainer'] },
  risk: { services: ['risk-assessment', 'tprm-programme', 'dora-readiness', 'operational-resilience-uk', 'iso-22301-bcm', 'tlpt-testing'], related: [] },
  compliance: { services: ['iso-27001', 'iso-27701-privacy', 'soc-2', 'gdpr-uk-gdpr', 'nis2-readiness'], related: ['cyber-essentials-plus'] },
  hr: { services: ['hr-advisory', 'hr-onboarding', 'hr-payroll-benefits'], related: [] },
  systems: { services: ['claris-filemaker-erp', 'erp-consulting-migration', 'business-systems-support'], related: [] },
};

// What an area shows: its own services first, then the related ones.
export function servicesForArea(areaId: string): string[] {
  const a = AREA_SERVICES[areaId];
  return a ? [...a.services, ...a.related] : [];
}

function boostApplies(b: Boost, a: Answers): boolean {
  const w = b.when;
  if (w.size && w.size !== a.size) return false;
  if (w.sector && w.sector !== a.sector) return false;
  if (w.eu && w.eu !== a.eu) return false;
  if (w.urgent && !a.urgent) return false;
  if (w.need && w.need !== a.need) return false;
  return true;
}

export function rankServices(a: Answers, services: GuideService[], limit = 3): Suggestion[] {
  const byId = new Map(services.map((s) => [s.id, s]));
  const need = NEEDS.find((n) => n.id === a.need);
  if (!need) return [];
  const score = new Map<string, number>();
  const reasons = new Map<string, string[]>();
  for (const [id, n] of Object.entries(need.weights)) {
    score.set(id, n);
    reasons.set(id, [need.label]);
  }
  for (const b of BOOSTS) {
    if (!boostApplies(b, a)) continue;
    for (const [id, n] of Object.entries(b.weights)) {
      const current = score.get(id) ?? 0;
      if (current <= 0) continue;
      score.set(id, current + n);
      if (n > 0) reasons.get(id)!.push(b.reason);
    }
  }
  const order = services.map((s) => s.id);
  return [...score.entries()]
    .filter(([id, n]) => n > 0 && byId.has(id))
    .sort((x, y) => y[1] - x[1] || order.indexOf(x[0]) - order.indexOf(y[0]))
    .slice(0, limit)
    .map(([id, n]) => ({ service: byId.get(id)!, score: n, reasons: reasons.get(id) ?? [] }));
}

// Build-time guard: a broken rule breaks the build, not the page.
export function validateGuide(serviceIds: string[]): void {
  const known = new Set(serviceIds);
  const referenced = new Set<string>();
  for (const n of NEEDS) Object.keys(n.weights).forEach((id) => referenced.add(id));
  for (const b of BOOSTS) Object.keys(b.weights).forEach((id) => referenced.add(id));
  Object.keys(TOPIC_BY_SERVICE).forEach((id) => referenced.add(id));
  Object.values(AREA_SERVICES).forEach((x) => [...x.services, ...x.related].forEach((id) => referenced.add(id)));
  const missing = [...referenced].filter((id) => !known.has(id));
  const hidden = [...referenced].filter((id) => HIDDEN_SERVICES.has(id));
  const areaIds = new Set(AREAS.map((x) => x.id));
  const orphanNeeds = NEEDS.filter((n) => !areaIds.has(n.area)).map((n) => n.id);
  const emptyAreas = AREAS.filter((x) => !NEEDS.some((n) => n.area === x.id)).map((x) => x.id);
  const placed = AREAS.flatMap((x) => AREA_SERVICES[x.id]?.services ?? []);
  const visible = serviceIds.filter((id) => !HIDDEN_SERVICES.has(id));
  const unplaced = visible.filter((id) => !placed.includes(id));
  const twice = placed.filter((id, i) => placed.indexOf(id) !== i);
  const noArt = [...serviceIds.filter((id) => !MOTIF_BY_SERVICE[id]), ...AREAS.filter((x) => !MOTIF_BY_AREA[x.id]).map((x) => x.id)];
  const problems = [
    missing.length && `unknown services [${missing.join(', ')}]`,
    hidden.length && `hidden services [${hidden.join(', ')}]`,
    orphanNeeds.length && `needs without area [${orphanNeeds.join(', ')}]`,
    emptyAreas.length && `areas without needs [${emptyAreas.join(', ')}]`,
    unplaced.length && `services in no area [${unplaced.join(', ')}]`,
    twice.length && `services in more than one area [${twice.join(', ')}]`,
    noArt.length && `without art [${noArt.join(', ')}]`,
  ].filter(Boolean);
  if (problems.length) throw new Error(`serviceGuide: ${problems.join(' · ')}`);
}
