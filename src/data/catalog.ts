// File: src/data/catalog.ts
// The knowledge catalogue: the single source of the facts this site states about StackSolver UK.
// The About page, /llms.txt and the structured data (JSON-LD) read from here, so a fact changes in one place.
// Services stay in menuData.ts and their grouping in serviceGuide.ts; catalogServices() joins them.
// Rule: state only what is true today, and change REVIEWED whenever a fact is checked or edited.

import { SERVICES_MENU } from './menuData';
import { AREAS, AREA_SERVICES } from './serviceGuide';

export const REVIEWED = '2026-11-26';

export const SITE_URL = 'https://www.stacksolveruk.com';

export const ORG = {
  name: 'StackSolver UK',
  legalName: 'StackSolver UK Limited',
  summary:
    'StackSolver UK Limited is an independent cyber security, governance, risk and compliance consultancy based in Brighton, for regulated industries.',
  specialty: 'Cyber security is our specialty.',
  tagline: 'Senior expertise. Lean delivery. Auditable by design.',
  email: 'hello@stacksolveruk.com',
  companyNumber: '16227080',
  jurisdiction: 'England and Wales',
  registryUrl: 'https://find-and-update.company-information.service.gov.uk/company/16227080',
  address: {
    street: '215 Ditchling Road',
    locality: 'Brighton',
    postalCode: 'BN1 6JD',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  offices: 'Brighton · London',
  areaServed: ['United Kingdom', 'Europe', 'United States'],
  areaServedText: 'the United Kingdom, Europe and the United States',
};

export const PRINCIPLES = [
  { title: 'Senior practitioners only', text: 'No junior staff billed at senior rates.' },
  { title: 'Cyber security at the core', text: 'Control, evidence and audit trail under everything we do.' },
  { title: 'Lean overhead, honest pricing', text: 'No rotating account managers, no partner pyramid to feed.' },
  { title: 'Fixed fees where scope is clear', text: 'You know what it costs before we start.' },
  { title: 'Compliance by design', text: 'Risk registers, evidence and audit trails from week one.' },
  { title: 'Independent', text: 'We do not resell tools we cannot defend. No kickbacks.' },
];

export const SECTORS = ['Technology', 'Professional Services', 'Financial Services', 'Healthcare', 'Corporate Services'];

// Our own credentials. A status changes here only when it is true (e.g. the certificate is issued).
export const CREDENTIALS = [
  {
    name: 'Companies House',
    status: 'Active',
    detail: `${ORG.legalName} · No. ${ORG.companyNumber} · ${ORG.jurisdiction}`,
    link: ORG.registryUrl,
    linkLabel: 'Public registry',
  },
  {
    name: 'Cyber Essentials',
    status: 'In progress',
    detail: 'UK Government-backed certification. Badge published once issued.',
    link: 'https://www.ncsc.gov.uk/cyberessentials/overview',
    linkLabel: 'NCSC scheme',
  },
  {
    name: 'ICO registration',
    status: 'In progress',
    detail: 'Registration as a data controller. Number published once issued.',
    link: '/legal/ico-registration',
    linkLabel: 'See notice',
  },
];

export type CatalogService = { id: string; title: string; description: string; url: string };
export type CatalogArea = { id: string; label: string; hint: string; url: string; services: CatalogService[] };

// The services exactly as /services shows them: the six areas, each with its own services.
export function catalogServices(): CatalogArea[] {
  const byId = new Map(SERVICES_MENU.flatMap((s) => s.subsections).map((s) => [s.id, s]));
  return AREAS.map((area) => ({
    id: area.id,
    label: area.label,
    hint: area.hint,
    url: `${SITE_URL}/services#${area.id}`,
    services: AREA_SERVICES[area.id].services.map((id) => {
      const s = byId.get(id);
      if (!s) throw new Error(`catalog: service "${id}" is listed in AREA_SERVICES but missing from menuData`);
      return { id, title: s.title, description: s.shortDescription, url: `${SITE_URL}/services#${id}` };
    }),
  }));
}

export const ORG_ID = `${SITE_URL}/#organization`;

// Organisation as structured data. Everything here is also visible on the site (footer, About, legal pages).
export function organizationJsonLd() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG.name,
    legalName: ORG.legalName,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
    description: `${ORG.summary} ${ORG.specialty}`,
    email: ORG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORG.address.street,
      addressLocality: ORG.address.locality,
      postalCode: ORG.address.postalCode,
      addressCountry: ORG.address.countryCode,
    },
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'Companies House company number',
      value: ORG.companyNumber,
    },
    areaServed: ORG.areaServed,
    sameAs: [ORG.registryUrl],
  };
}

// The service catalogue as structured data, for the /services page (where every item is visible).
export function servicesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${ORG.name} services`,
    url: `${SITE_URL}/services`,
    itemListElement: catalogServices().map((area) => ({
      '@type': 'OfferCatalog',
      name: area.label,
      itemListElement: area.services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description,
          url: s.url,
          provider: { '@id': ORG_ID },
          areaServed: ORG.areaServed,
        },
      })),
    })),
  };
}
