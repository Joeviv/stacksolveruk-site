// File: src/data/menuData.ts

import {
  CpuChipIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon,
  Square3Stack3DIcon
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

const COMING_SOON_DESC = 'Detailed page in preparation. Please contact us at office@stacksolveruk.com for current scope and pricing.';

const placeholderImpl: ImplementationStep[] = [
  { step: 1, title: 'Discovery', description: 'Initial assessment of your current state and objectives.' },
  { step: 2, title: 'Design',    description: 'Tailored solution design aligned with your processes.' },
  { step: 3, title: 'Delivery',  description: 'Implementation, training and handover.' },
  { step: 4, title: 'Support',   description: 'Ongoing support and continuous improvement.' }
];

const placeholderImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop';

export const SERVICES_MENU: Section[] = [
  {
    id: 'ai-local',
    title: 'Sovereign AI',
    icon: CpuChipIcon,
    subsections: [
      {
        id: 'ai-strategy',
        title: 'AI Strategy & Security',
        shortDescription: 'Strategic consultancy and data security for AI rollouts.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Data Sovereignty', description: 'Models running entirely inside your perimeter. Your data never leaves your infrastructure.' },
          { title: 'Ethical AI Framework', description: 'Aligned with EU AI Act, NIST AI RMF and ISO/IEC 42001.' },
          { title: 'Zero Data Egress', description: 'Compatible with ISO 27001:2022 and ISAE 3402 audits.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'ai-ethical-sandbox',
        title: 'Ethical AI Sandbox',
        shortDescription: 'Auditable AI piloting framework for regulated environments.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'EU AI Act · ISO 27001:2022 · ISO 42001',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Private RAG', description: 'Retrieval-augmented generation across your documents, fully on-premise or in your private cloud.' },
          { title: 'Audit-ready Logs', description: 'Immutable logs for compliance evidence.' }
        ],
        image: placeholderImage,
      }
    ]
  },
  {
    id: 'erp-filemaker',
    title: 'Custom ERP & Claris FileMaker',
    icon: Square3Stack3DIcon,
    subsections: [
      {
        id: 'bespoke-erp',
        title: 'Bespoke ERP Development',
        shortDescription: 'Finance, HR, projects, inventory and operations in one tailored system.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Claris FileMaker Partner', description: 'Official Claris FileMaker Partner with 18+ years on the platform.' },
          { title: 'Tailored to Your Process', description: 'No off-the-shelf compromise — built around how your business actually operates.' }
        ],
        image: placeholderImage,
      },
      {
        id: 'legacy-modernisation',
        title: 'Legacy System Modernisation',
        shortDescription: 'Migrate or wrap legacy systems without disrupting day-to-day operations.',
        fullDescription: COMING_SOON_DESC,
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Migration Path', description: 'From spreadsheets, Access, old FileMaker versions or in-house tools to a modern stack.' }
        ],
        image: placeholderImage,
      }
    ]
  },
  {
    id: 'grc',
    title: 'Governance, Risk & Compliance',
    icon: ShieldCheckIcon,
    subsections: [
      {
        id: 'iso-implementation',
        title: 'ISO 27001 & ISO 42001 Implementation',
        shortDescription: 'Information security and AI management systems aligned with British and EU standards.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'ISO 27001:2022 · ISO 42001 · UK GDPR',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Gap Analysis', description: 'Initial assessment against the standard and prioritised remediation roadmap.' },
          { title: 'Audit Preparation', description: 'Evidence pack and dry-run audits before certification.' }
        ],
        image: placeholderImage,
      }
    ]
  },
  {
    id: 'apple-business',
    title: 'Apple Business',
    icon: ComputerDesktopIcon,
    subsections: [
      {
        id: 'abm-rollout',
        title: 'Apple Business Manager Rollout',
        shortDescription: 'Corporate ABM setup, MDM integration and ongoing support.',
        fullDescription: COMING_SOON_DESC,
        techBadge: 'ABM · MDM · VPP · DEP',
        implementationPlan: placeholderImpl,
        features: [
          { title: 'Managed Apple IDs', description: 'Corporate identity setup and federation.' },
          { title: 'MDM Integration', description: 'Jamf, Mosyle or Kandji integration to your existing or new MDM.' }
        ],
        image: placeholderImage,
      }
    ]
  }
];
