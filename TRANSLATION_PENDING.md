# Translation & Content Pending

> Punch-list of content work outstanding on stacksolveruk.com.
> The site is fully in **British English** with **zero Spanish anywhere** in committed code.
> Pages flagged below currently use **EN-UK placeholders** until detailed copy lands.

Last updated: 2026-04-24

---

## Pages with full content

- ✅ `index.astro` — homepage, fully written (Hero + intro + four pillars + CTA + footer)
- ✅ `contact.astro` — full UK contact details and form
- ✅ Hero components (`HeroV2.tsx`, `HeroArtifacts.tsx`, `HeroDotMap.tsx`) — English-only, UK / Europe / USA city set
- ✅ `Navbar.tsx`, `ContactForm.tsx`, `ProjectGantt.tsx` — English-only

## Pages with placeholder copy (need full content)

- 🟡 `about.astro` — short intro live; needs leadership profile, credentials timeline, case studies
- 🟡 `method.astro` — four-stage cadence live; needs detailed methodology, downloadable framework
- 🟡 `diagnostic.astro` — needs self-service diagnostic form (currently links to email)
- 🟡 `library.astro` — needs first articles
- 🟡 `services/[sectionId]/index.astro` — generic landing; needs imagery and richer service-area copy
- 🟡 `services/[sectionId]/[subsectionId].astro` — driven by `menuData.ts`; needs richer descriptions per subsection
- 🟡 `services/apple-business.astro` — short live page; needs detailed engagement scope, deliverables, pricing
- 🟡 `data/menuData.ts` — service descriptions are placeholder text pointing to `office@stacksolveruk.com`

## Outstanding assets

- ⬜ Logo SVG redesign for "Stacksolver UK" wordmark (currently using parent project favicon and icon)
- ⬜ `og-image.png` regeneration with UK branding
- ⬜ Consider replacing video assets (currently inherited from `.tech` project — `public/videos/`)
- ⬜ Hero photography / illustrations for service pages (currently uses Unsplash placeholders in `menuData.ts`)
- ⬜ Update `public/general/logo_stacksolver_main.svg` and `logo-mark-v2.svg` to UK variants

## Domain / email

- ⬜ Decide email provider for `office@stacksolveruk.com` (Google Workspace, Microsoft 365 again, simple forwarder, or remove from public site)
- ⬜ Add SPF / DKIM / DMARC DNS records once email provider is chosen

## SEO / metadata

- 🟡 `sitemap.xml` will auto-generate via `@astrojs/sitemap` — verify after first deploy
- ⬜ Add JSON-LD `Organization` schema with full British address
- ⬜ Add `og-image.png` regeneration with UK branding
