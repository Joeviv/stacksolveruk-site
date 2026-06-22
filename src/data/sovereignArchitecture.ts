// File: src/data/sovereignArchitecture.ts
// Single source of truth for the Sovereign AI "living perimeter" diagram and the
// risk overlay. Edit text/links here — the components read from this file so you
// never have to touch component code to adjust copy. EN-UK, sentence case.

export interface RingDef {
  id: string;        // stable key
  label: string;     // display name
  hint: string;      // one-line role
  href: string;      // its own page
  /** olive-family accent for this ring (used inline; mapped to brand tokens) */
  colour: string;
  /** what is in place now (2026) — the live items for this ring */
  now: string[];
  /** what is coming next (2027) — the forward-looking item for this ring */
  next: string;
}

export interface FlowStep {
  num: string;       // 01..04
  key: string;       // data / model / inference / delivery
  label: string;     // display name
  sub: string;       // short qualifier
  href: string;
}

export interface DepartmentDef {
  label: string;
  href: string;
}

export interface SectorDef {
  id: string;        // stable key
  label: string;     // display name (EN-UK, sentence case)
  hint: string;      // one-line "why this sector cares"
  href: string;      // its own vertical page under /industries/
}

export interface RiskDef {
  key: string;
  title: string;
  when: "now" | "next";   // 2026 priority vs 2027 horizon
  quantumReady?: boolean;
  detail: string;
  answer: string;
  layer: string;          // which layer neutralises it
  href: string;
}

/* -------------------------------------------------------------------------
   The nested rings of protection (outermost → innermost), wrapping the core.
   Colours map to the brand olive scale plus supporting accents already used
   across the site (olive primary, with cool/warm/green supporting hues).
   ------------------------------------------------------------------------- */
export const RINGS: RingDef[] = [
  {
    id: "compliance",
    label: "Compliance",
    hint: "the certified boundary",
    href: "/compliance",
    colour: "#9bb84a", // olive-400
    now: ["Cyber Essentials", "ISO 27001", "ISO 42001"],
    next: "EU AI Act high-risk ready",
  },
  {
    id: "governance",
    label: "Governance & GRC",
    hint: "how it is controlled",
    href: "/governance",
    colour: "#85a03a", // olive-500
    now: ["AI risk register", "human oversight", "access control"],
    next: "EU AI Act governance",
  },
  {
    id: "security",
    label: "Security & guardrails",
    hint: "the safety wall",
    href: "/security",
    colour: "#b5ca6c", // olive-300
    now: ["prompt-injection defence", "PII masking", "audit layer"],
    next: "agentic-AI guardrails",
  },
  {
    id: "infrastructure",
    label: "Sovereign infrastructure",
    hint: "where it runs",
    href: "/infrastructure",
    colour: "#6d8530", // olive-600
    now: ["UK residency", "no egress", "encryption"],
    next: "post-quantum crypto (quantum-ready)",
  },
];

/* -------------------------------------------------------------------------
   Verticals — the sectors a visitor self-identifies with. Shown as the "By
   sector" strip at the top of the perimeter diagram; each links to its own
   page under /industries/. Lead three, per GTM (NHS/public, legal, finance).
   Keep claims defensible — EN-UK, no overclaim.
   ------------------------------------------------------------------------- */
export const SECTORS: SectorDef[] = [
  {
    id: "nhs",
    label: "NHS & public sector",
    hint: "patient & citizen data, never egressed",
    href: "/industries/nhs",
  },
  {
    id: "legal",
    label: "Legal",
    hint: "privilege & confidentiality, absolute",
    href: "/industries/legal",
  },
  {
    id: "financial-services",
    label: "Financial services",
    hint: "FCA, lineage & operational resilience",
    href: "/industries/financial-services",
  },
];

/* The living core: your data and models, with the flow that stays in-house. */
export const FLOW: FlowStep[] = [
  { num: "01", key: "data", label: "Data", sub: "kept in-house", href: "/data" },
  { num: "02", key: "model", label: "Model", sub: "open-weight", href: "/model" },
  { num: "03", key: "inference", label: "Inference", sub: "hardware you own", href: "/inference" },
  { num: "04", key: "delivery", label: "Delivery", sub: "audit-logged", href: "/delivery" },
];

/* Departments that connect from within, through governed access only. */
export const DEPARTMENTS: DepartmentDef[] = [
  { label: "Procurement", href: "/for/procurement" },
  { label: "Finance", href: "/for/finance" },
  { label: "HR", href: "/for/hr" },
  { label: "Operations", href: "/for/operations" },
  { label: "Legal", href: "/for/legal" },
  { label: "Sales", href: "/for/sales" },
  { label: "Marketing", href: "/for/marketing" },
  { label: "IT", href: "/for/it" },
  { label: "Security", href: "/for/security" },
  { label: "Customer service", href: "/for/customer-service" },
  { label: "R&D / Product", href: "/for/rd-product" },
  { label: "Data & analytics", href: "/for/data-analytics" },
  { label: "Supply chain", href: "/for/supply-chain" },
  { label: "Executive / Board", href: "/for/executive-board" },
];

/* The departments we have written outcome pages for (the rest are stubs). */
export const DEPARTMENT_OUTCOMES: { label: string; href: string; outcome: string }[] = [
  {
    label: "Procurement",
    href: "/for/procurement",
    outcome:
      "Read supplier contracts, flag risk clauses and draft tender responses — without a single document leaving your perimeter.",
  },
  {
    label: "Finance",
    href: "/for/finance",
    outcome:
      "Query ledgers, reconcile and summarise in plain English, with every answer logged for your auditors.",
  },
  {
    label: "HR",
    href: "/for/hr",
    outcome:
      "Answer policy questions and triage cases on private staff data that never touches a public model.",
  },
  {
    label: "Operations",
    href: "/for/operations",
    outcome:
      "Turn runbooks, tickets and logs into instant answers for the team, on infrastructure you own.",
  },
  {
    label: "Legal",
    href: "/for/legal",
    outcome:
      "Review, compare and summarise contracts on confidential matters, with bounded, auditable behaviour.",
  },
  {
    label: "Customer service",
    href: "/for/customer-service",
    outcome:
      "Resolve enquiries against your own knowledge base — fast, on-brand and inside your jurisdiction.",
  },
  {
    label: "Sales",
    href: "/for/sales",
    outcome:
      "Draft proposals, brief reps and answer product questions from your own deal history and collateral — never exposing your pipeline to a public model.",
  },
  {
    label: "Marketing",
    href: "/for/marketing",
    outcome:
      "Produce on-brand copy and research from your own messaging and customer data, with every draft kept inside your perimeter and your IP.",
  },
  {
    label: "IT",
    href: "/for/it",
    outcome:
      "Turn runbooks, tickets and logs into instant answers and first-line triage, on infrastructure you own and can audit.",
  },
  {
    label: "Security",
    href: "/for/security",
    outcome:
      "Summarise alerts, draft incident notes and query your own logs — without feeding sensitive detection data to an outside service.",
  },
  {
    label: "R&D / Product",
    href: "/for/rd-product",
    outcome:
      "Reason over confidential research, specs and prototypes inside the perimeter, so your most valuable IP never trains someone else's model.",
  },
  {
    label: "Data & analytics",
    href: "/for/data-analytics",
    outcome:
      "Query datasets and explain results in plain English on data that stays in-house, with the lineage to back every figure.",
  },
  {
    label: "Supply chain",
    href: "/for/supply-chain",
    outcome:
      "Read supplier terms, surface delivery risk and summarise logistics data — fast answers, with nothing leaving your control.",
  },
  {
    label: "Executive / Board",
    href: "/for/executive-board",
    outcome:
      "Brief the board from confidential performance and risk data, with audit-logged, governed answers you can defend to a regulator.",
  },
];

/* Risk overlay — "Built for 2026, ready for 2027". Mapped to neutralising layer.
   Verified content lives in Biblioteca/Sovereign_AI/02_Riesgos_2026_2027_y_ForwardLook.md */
export const RISKS: RiskDef[] = [
  {
    key: "quantum",
    title: "Quantum · harvest now, decrypt later",
    when: "next",
    quantumReady: true,
    detail: "Sovereign data stolen today is decrypted once quantum matures.",
    answer: "Post-quantum crypto (NIST ML-KEM / ML-DSA), quantum-ready by design.",
    layer: "L1 + L4 · Crypto",
    href: "/risks#quantum",
  },
  {
    key: "prompt-injection",
    title: "Prompt injection",
    when: "now",
    detail: "OWASP LLM risk #1 — malicious instructions hidden in documents, email and web.",
    answer: "Input and output filtering, with injection defence at runtime.",
    layer: "L3 · Guardrails",
    href: "/risks#prompt-injection",
  },
  {
    key: "poisoning",
    title: "Model & data poisoning",
    when: "now",
    detail: "Tampered training data or weights quietly corrupt the model.",
    answer: "Auditable models with verified provenance.",
    layer: "L2 · Model",
    href: "/risks#poisoning",
  },
  {
    key: "supply-chain",
    title: "Model supply chain",
    when: "now",
    detail: "Malicious models from public hubs (OWASP risk #3).",
    answer: "Vetted, local, provenance-tracked models only.",
    layer: "L2 · Model",
    href: "/risks#supply-chain",
  },
  {
    key: "agentic",
    title: "Agentic AI · excessive agency",
    when: "next",
    detail: "When the model acts, a single injection can do real damage.",
    answer: "Scoped permissions, human-in-the-loop and monitoring.",
    layer: "L3 + L5 · Guardrails / Ops",
    href: "/risks#agentic",
  },
  {
    key: "shadow-ai",
    title: "Shadow AI · data leakage",
    when: "now",
    detail: "Staff pasting data into public AI — the core problem.",
    answer: "Local inference; data never leaves the perimeter.",
    layer: "L2 + L1 · Local",
    href: "/risks#shadow-ai",
  },
  {
    key: "deepfakes",
    title: "Deepfakes & impersonation",
    when: "now",
    detail: "Synthetic voice and video for fraud and social engineering.",
    answer: "Verification controls and monitoring.",
    layer: "L5 + L3 · Ops",
    href: "/risks#deepfakes",
  },
  {
    key: "regulatory",
    title: "Regulatory · EU AI Act",
    when: "next",
    detail: "High-risk obligations land December 2027; the UK stays pro-innovation.",
    answer: "ISO 42001 governance, audit-ready.",
    layer: "L4 · Governance",
    href: "/risks#regulatory",
  },
];
