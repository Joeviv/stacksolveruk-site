// File: src/pages/llms.txt.ts
// /llms.txt, generated at build time from the knowledge catalogue (src/data/catalog.ts),
// so it can never drift from what the pages say.
import type { APIRoute } from 'astro';
import { ORG, PRINCIPLES, SECTORS, SITE_URL, REVIEWED, catalogServices } from '../data/catalog';

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const sentence = (s: string) => (s.endsWith('.') ? s : `${s}.`);

export const GET: APIRoute = () => {
  const a = ORG.address;
  const areas = catalogServices();
  const lines: string[] = [
    `# ${ORG.name}`,
    '',
    `> ${ORG.summary} **${ORG.specialty}** Serving **${ORG.areaServedText}**. ${ORG.tagline}`,
    '',
    `**Official site:** ${SITE_URL}`,
    `**All services:** ${SITE_URL}/services`,
    `**About:** ${SITE_URL}/about`,
    `**Contact:** ${ORG.email} · ${SITE_URL}/contact`,
    `**Registered office:** ${a.street}, ${a.locality}, ${a.postalCode}, ${a.country}`,
    `**Company Number:** ${ORG.companyNumber} (${ORG.jurisdiction})`,
    `**Last reviewed:** ${REVIEWED}`,
    '',
    '## How we work',
    '',
    ...PRINCIPLES.map((p) => `- ${p.title}: ${lowerFirst(sentence(p.text))}`),
    '',
    `## Services: ${areas.length} areas`,
    '',
  ];
  for (const area of areas) {
    lines.push(`### ${area.label}${area.id === 'cyber' ? ' (our specialty)' : ''}`);
    lines.push(`${sentence(area.hint)} ${area.url}`);
    // Descriptions keep their capitals: many start with a proper noun (Zero Trust, DORA, Bank of England).
    for (const s of area.services) lines.push(`- [${s.title}](${s.url}): ${sentence(s.description)}`);
    lines.push('');
  }
  lines.push('## Who we work with', '');
  lines.push(
    `Regulated industries across ${ORG.areaServedText}: ${SECTORS.map((s) => s.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`,
  );
  lines.push('');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
