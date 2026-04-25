// File: src/data/menuData.ts

import {
  ShieldExclamationIcon,
  CpuChipIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  DocumentCheckIcon,
  ScaleIcon,
  BugAntIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

export type ImplementationStep = {
  step: number;
  title: string;
  description: string;
  longDescription?: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type SubSection = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  implementationPlan: ImplementationStep[];
  features: (string | FeatureItem)[];
  image: string;
  isInteractiveBuilder?: boolean;
  techBadge?: string;
  videoId?: string;
};

export type Section = {
  id: string;
  title: string;
  icon: any;
  subsections: SubSection[];
};

const COMING_SOON_DESC = 'Detailed page in preparation. Please contact us at office@stacksolveruk.com for current scope, methodology and engagement options.';

const placeholderImpl: ImplementationStep[] = [
  { step: 1, title: 'Discovery', description: 'Initial assessment of your current state, regulatory constraints and objectives.' },
  { step: 2, title: 'Design',    description: 'Tailored solution architecture aligned with your processes and standards.' },
  { step: 3, title: 'Delivery',  description: 'Implementation, training and documented handover.' },
  { step: 4, title: 'Support',   description: 'Ongoing retainer covering enhancements and continuous improvement.' }
];

const placeholderImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop';

export const SERVICES_MENU: Section[] = [

  // ===== CYBER PRACTICE — our specialty =====
  {
    id: 'cyber',
    title: 'Cyber Security',
    icon: ShieldExclamationIcon,
    subsections: [
      {
        id: 'cyber-essentials-plus',
        title: 'Cyber Essentials Plus',
        shortDescription: 'Get certified fast. Enter corporate procurement with the badge UK buyers expect.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'NCSC · IASME · CyberSmart',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Rapid certification', description: 'Streamlined preparation for organisations that need the badge quickly.' },
          { title: 'Annual recertification', description: 'Continuous compliance support to maintain the certification year on year.' },
          { title: 'Remediation expertise', description: 'For firms that have failed previous Cyber Essentials Plus audits and need a structured fix.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'penetration-testing',
        title: 'Penetration Testing',
        shortDescription: 'Independent security testing by CREST-certified practitioners.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'CREST · OWASP · NCSC CHECK',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Web application testing', description: 'OWASP-aligned assessment of your web platforms and APIs.' },
          { title: 'Infrastructure testing', description: 'Internal and external network testing against modern threat models.' },
          { title: 'Cloud security review', description: 'AWS, Azure and Google Cloud security configuration review against CIS benchmarks.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'vciso-retainer',
        title: 'Virtual CISO (vCISO)',
        shortDescription: 'Senior security leadership on retainer, without the cost of a full-time hire.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Strategic security leadership', description: 'Board-level reporting, risk register ownership, regulatory engagement.' },
          { title: 'Programme delivery', description: 'Drives the implementation of the security roadmap with our delivery team.' },
          { title: 'Senior practitioners only', description: '15+ years of CISO and equivalent experience across regulated industries.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'security-architecture',
        title: 'Security Architecture',
        shortDescription: 'Zero Trust, Identity, network segmentation and cloud security design.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Zero Trust design', description: 'Aligned with NIST 800-207 and BeyondCorp principles.' },
          { title: 'Identity & Access', description: 'IAM modernisation, passwordless, FIDO2.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'incident-response',
        title: 'Incident Response',
        shortDescription: 'On-call retainer, playbook development and tabletop exercises.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'NIST 800-61 · SANS',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'IR retainer', description: 'Defined SLA, named responders, regular drills.' },
          { title: 'Tabletop exercises', description: 'Board, IT and business-line scenarios facilitated by senior practitioners.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'security-awareness',
        title: 'Security Awareness',
        shortDescription: 'Phishing simulation, e-learning and culture programmes.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Phishing simulation', description: 'Continuous campaigns with detailed analytics.' },
          { title: 'Tailored content', description: 'Modules adapted to your industry and risk profile.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== AI PRACTICE =====
  {
    id: 'ai',
    title: 'AI & All Its Flavours',
    icon: CpuChipIcon,
    subsections: [
      {
        id: 'ethical-ai-sandbox',
        title: 'Ethical AI Sandbox',
        shortDescription: 'Auditable AI piloting framework for regulated environments.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'EU AI Act · ISO 42001 · NIST AI RMF',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Compliance by design', description: 'DPIA, AI Risk Assessment and EU AI Act mapping delivered with the pilot.' },
          { title: 'Predictable timeline', description: 'A defined POC scope with a clear go / no-go before scale-out.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'sovereign-rag',
        title: 'Sovereign RAG',
        shortDescription: 'Retrieval-augmented generation across your documents, fully on-premise or in your private cloud.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'AWS Bedrock · Azure OpenAI · Ollama · vLLM',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Zero data egress', description: 'Models running entirely inside your perimeter. Your data never leaves your infrastructure.' },
          { title: 'Audit-ready logs', description: 'Immutable logs for compliance evidence, ISO 27001 and ISAE 3402 compatible.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'ai-governance-iso-42001',
        title: 'AI Governance (ISO 42001)',
        shortDescription: 'Build the AI Management System the new EU AI Act and UK regulators expect.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'ISO 42001:2023 · NIST AI RMF · EU AI Act',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'AI Governance Charter', description: 'Policies, principles, roles and decision rights.' },
          { title: 'Risk Assessment', description: 'AI-specific risk register aligned to EU AI Act categories.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'agentic-ai',
        title: 'Agentic AI',
        shortDescription: 'Multi-agent systems with tool use for research, drafting, classification and routing.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Tool use & function calling', description: 'Production-grade agentic patterns.' },
          { title: 'Sandbox & safety', description: 'Authorisation boundaries and audit trails by default.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'ai-act-compliance',
        title: 'EU AI Act Compliance',
        shortDescription: 'Programmes to meet the new EU AI Act obligations for high-risk and general-purpose systems.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'EU AI Act · UK AI WP',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Risk classification', description: 'Map your systems to AI Act categories (Annex III, GPAI).' },
          { title: 'Documentation & DPIAs', description: 'Auditable artefacts ready for regulators and clients.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== AREAS + AI (Procurement+AI and HR+AI as anchors) =====
  {
    id: 'areas-ai',
    title: 'Areas + AI Integrations',
    icon: PuzzlePieceIcon,
    subsections: [
      {
        id: 'procurement-ai',
        title: 'Procurement + AI',
        shortDescription: 'Vendor scoring, spend analysis and contract intelligence — embedded in the function.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Vendor risk scoring', description: 'Automated assessment of financial, compliance and performance risk.' },
          { title: 'Spend categorisation', description: 'Auto-tagging from invoice text and ERP data.' },
          { title: 'Contract intelligence', description: 'Lifecycle alerts, clause comparison, auto-renewal flags.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'hr-ai',
        title: 'HR + AI',
        shortDescription: 'AI for HR functions — engineered with Equality Act and EU AI Act high-risk system obligations in mind.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'Equality Act 2010 · EU AI Act Annex III',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Resume screening (compliance-first)', description: 'Designed for fairness, transparency and human-in-the-loop, with bias monitoring.' },
          { title: 'Internal mobility matching', description: 'Skills graphs that surface opportunities across the organisation.' },
          { title: 'Employee Q&A', description: 'RAG over HR knowledge base, policies and benefits.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'finance-ai',
        title: 'Finance + AI',
        shortDescription: 'AP automation, AR optimisation and forecasting — embedded in finance workflows.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'AP automation', description: 'Invoice OCR, three-way match, approval routing.' },
          { title: 'Cash flow forecasting', description: 'Predictive analytics with LLM-augmented narrative.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'legal-ai',
        title: 'Legal + AI',
        shortDescription: 'Contract review, regulatory monitoring and discovery support.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Contract review', description: 'Clause extraction, redlining, risk flagging.' },
          { title: 'Regulatory monitoring', description: 'Alerts for changes in laws relevant to your business.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'compliance-ai',
        title: 'Compliance + AI',
        shortDescription: 'Control testing automation, regulatory change management, audit preparation.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Control testing', description: 'Evidence collection and attestation automation.' },
          { title: 'Audit preparation', description: 'Evidence pack generation for ISO, SOC 2 and regulatory audits.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== GRC =====
  {
    id: 'grc',
    title: 'Governance, Risk & Compliance',
    icon: ShieldCheckIcon,
    subsections: [
      {
        id: 'gap-analysis',
        title: 'Gap Analysis & Maturity Assessment',
        shortDescription: 'Where you are vs where you need to be, with a prioritised remediation roadmap.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Standards-aligned', description: 'Assessment against ISO 27001:2022, NIST CSF 2.0, or your chosen framework.' },
          { title: 'Prioritised roadmap', description: 'Risk-ranked, time-boxed actions you can execute.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'risk-assessment',
        title: 'Risk Assessment & Risk Register',
        shortDescription: 'Build the risk register that auditors and boards expect to see.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Information security risk', description: 'Aligned with ISO 27005:2022.' },
          { title: 'Operational risk', description: 'Aligned with UK regulator expectations for relevant sectors.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'dpo-as-service',
        title: 'DPO-as-a-Service',
        shortDescription: 'Outsourced Data Protection Officer aligned with UK GDPR and DPA 2018.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'UK GDPR · DPA 2018 · CIPP/E',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Independent oversight', description: 'CIPP/E certified DPO acting as your statutory contact.' },
          { title: 'DSAR & breach handling', description: 'Process design and operational support for data subject requests and breaches.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'internal-audit',
        title: 'Internal Audit',
        shortDescription: 'Pre-certification dry-runs and ongoing internal audit programmes for ISO standards.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Lead Auditor expertise', description: 'IRCA-certified Lead Auditors for ISO 27001 and related standards.' },
          { title: 'Findings management', description: 'Structured non-conformity reporting and remediation tracking.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== ISO + COMPLIANCE FRAMEWORKS =====
  {
    id: 'iso-compliance',
    title: 'ISO & Compliance Frameworks',
    icon: DocumentCheckIcon,
    subsections: [
      {
        id: 'iso-27001',
        title: 'ISO/IEC 27001:2022',
        shortDescription: 'Information Security Management System — implementation, certification support, surveillance.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'IRCA Lead Implementer',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Fixed-fee implementation', description: 'Predictable scope, predictable cost, predictable timeline.' },
          { title: 'Audit body partnerships', description: 'Coordination with UKAS-accredited certification bodies.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'iso-42001',
        title: 'ISO/IEC 42001:2023 (AI Management)',
        shortDescription: 'The new AI Management System standard — one of the few UK practices delivering this today.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'ISO 42001 · NIST AI RMF · EU AI Act',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'AI governance, end to end', description: 'From principles to operational controls.' },
          { title: 'Cross-mapped', description: 'Bridges ISO 42001 with NIST AI RMF and EU AI Act obligations.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'iso-27701-privacy',
        title: 'ISO/IEC 27701 (Privacy)',
        shortDescription: 'Privacy Information Management System extending ISO 27001 with GDPR alignment.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'GDPR-mapped controls', description: 'Direct mapping to UK GDPR and EU GDPR requirements.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'iso-22301-bcm',
        title: 'ISO 22301 (Business Continuity)',
        shortDescription: 'Business Continuity Management System for resilience and DORA alignment.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'BC/DR planning', description: 'Plans, exercises and reviews aligned to ISO 22301.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'soc-2',
        title: 'SOC 2 Type I & II',
        shortDescription: 'For UK firms selling to the United States — readiness, evidence and CPA coordination.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'AICPA · SOC 2 Trust Services',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Type I readiness', description: 'Get audit-ready with the controls and evidence in place.' },
          { title: 'Type II observation', description: 'Six-month operating effectiveness support.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'gdpr-uk-gdpr',
        title: 'GDPR & UK GDPR',
        shortDescription: 'Compliance programmes for organisations handling personal data in the UK and EU.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'UK GDPR · EU GDPR · DPA 2018',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'DPIA and ROPA', description: 'Article 30 records and impact assessments.' },
          { title: 'International transfers', description: 'UK IDTA, EU SCC and addendum mechanisms.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== RISK & RESILIENCE (NIS2 + DORA + TPRM) =====
  {
    id: 'risk-resilience',
    title: 'NIS2 · DORA · Supply Chain Risk',
    icon: ScaleIcon,
    subsections: [
      {
        id: 'nis2-readiness',
        title: 'NIS2 Readiness',
        shortDescription: 'Gap assessment and implementation for the NIS2 Directive — applicable to UK firms with EU operations.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'EU Directive 2022/2555',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Gap assessment', description: 'NIS2 measures mapped against your current posture.' },
          { title: 'Full implementation', description: 'Governance, technical controls, supply chain, incident handling.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'dora-readiness',
        title: 'DORA Readiness',
        shortDescription: 'Digital Operational Resilience Act compliance for financial entities and ICT third-party providers.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'EU Regulation 2022/2554',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Five pillars', description: 'ICT risk, incident reporting, resilience testing, third-party risk, information sharing.' },
          { title: 'TPP register', description: 'ICT third-party provider register and contractual remediation.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'tlpt-testing',
        title: 'TLPT (Threat-Led Penetration Testing)',
        shortDescription: 'DORA-mandated threat-led penetration testing for significant financial entities.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'TIBER-EU · CREST',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'TIBER-EU aligned', description: 'Methodology consistent with EU regulator expectations.' },
          { title: 'CREST-certified testers', description: 'All testing performed by accredited practitioners.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'tprm-programme',
        title: 'Third-Party Risk Management',
        shortDescription: 'Vendor risk programme design and operations — driven by GDPR, ISO, NIS2, DORA and SOC 2.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Programme design', description: 'Framework, tier classification, governance.' },
          { title: 'Continuous monitoring', description: 'Vendor reassessment cadence and alert response.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'operational-resilience-uk',
        title: 'UK Operational Resilience',
        shortDescription: 'Bank of England SS1/21 important business services and resilience scenarios.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'PRA SS1/21 · FCA PS21/3',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Important business services', description: 'Mapping, impact tolerance setting, scenario testing.' },
          { title: 'Self-assessment', description: 'Annual self-assessment artefacts ready for PRA / FCA review.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== AI SECURITY (cross-cutting AI + Cyber) =====
  {
    id: 'ai-security',
    title: 'AI Security & Red Teaming',
    icon: BugAntIcon,
    subsections: [
      {
        id: 'ai-system-assessment',
        title: 'AI System Security Assessment',
        shortDescription: 'Threat modelling and security review of your production AI systems.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'OWASP Top 10 LLM · MITRE ATLAS',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'OWASP Top 10 for LLM', description: 'Mapped against the latest community standard.' },
          { title: 'MITRE ATLAS mapping', description: 'Adversarial threat landscape analysis.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'ai-red-teaming',
        title: 'AI Red Teaming',
        shortDescription: 'Adversarial testing of LLMs and AI applications — prompt injection, jailbreaks, data leakage.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Coordinated testing', description: 'Performed in collaboration with your team — no surprises.' },
          { title: 'Vulnerability report + PoCs', description: 'Detailed findings with reproducible proofs of concept.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'rag-security-review',
        title: 'RAG & Knowledge Base Security',
        shortDescription: 'Security review of retrieval-augmented systems built on corporate documents.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Embedding store hardening', description: 'Reviewed against unauthorised retrieval and poisoning.' },
          { title: 'Output sanitisation', description: 'Indirect prompt injection defences.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'agentic-ai-security',
        title: 'Agentic AI Security',
        shortDescription: 'Tool authorisation, sandbox escape testing and privilege analysis for autonomous agents.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Authorisation testing', description: 'Boundary checks for tool access and impersonation.' },
          { title: 'Plan injection', description: 'Adversarial testing of agentic plans and reasoning.' }
        ],
        image: placeholderImage,
      }
    ]
  },

  // ===== LOCAL AI STACK =====
  {
    id: 'local-ai',
    title: 'Local AI Stack',
    icon: ServerIcon,
    subsections: [
      {
        id: 'lean-tier-mac-studio',
        title: 'Lean Tier — Apple Silicon',
        shortDescription: 'Mac Studio M-series single-node deployment for 5–20 concurrent users. Fast to deploy, fully sovereign.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'Apple Silicon · Ollama · Llama 3.3',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Sovereign by design', description: 'Models, vector store and UI all on hardware you own.' },
          { title: 'Predictable cost', description: 'One-time hardware investment plus implementation and support.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'production-tier-gpu',
        title: 'Production Tier — GPU Server',
        shortDescription: 'NVIDIA H100 / H200 single-server deployment for 50–200 concurrent users.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'NVIDIA · vLLM · Mixtral',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Production-grade inference', description: 'High throughput, low latency, professional MLOps.' },
          { title: 'Enterprise SSO', description: 'Integrated with your identity provider.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'enterprise-tier-cluster',
        title: 'Enterprise Tier — Cluster',
        shortDescription: 'Multi-node HGX cluster for 500+ users, fine-tuned models and agentic workloads.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'NVIDIA HGX · InfiniBand',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Scaled inference', description: 'Distributed serving across multiple nodes.' },
          { title: 'Fine-tuning', description: 'LoRA adapters for your domain-specific use cases.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'private-cloud-bedrock',
        title: 'Private Cloud — Bedrock / Azure',
        shortDescription: 'AWS Bedrock private endpoints, Azure OpenAI dedicated, GCP Vertex AI private.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'AWS Bedrock · Azure OpenAI · GCP Vertex',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'No on-prem requirement', description: 'Sovereignty in your cloud account, not your data centre.' },
          { title: 'Multi-cloud agnostic', description: 'We are not tied to any single hyperscaler.' }
        ],
        image: placeholderImage,
      }
    ]
  }
];
