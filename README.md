# Stacksolver UK Site

> **Official website of Stacksolver UK Limited**
> **URL:** https://www.stacksolveruk.com
> **Source mirror:** Replicated from `Joeviv/stacksolver-site`, adapted for British English and UK / Europe / USA coverage.

---

## Stack

| Layer | Version |
|---|---|
| Framework | Astro 6.1.x |
| UI | React 19.x |
| Styling | TailwindCSS 4.x (via Vite) |
| Icons | Heroicons React 2.x |
| SEO | @astrojs/sitemap 3.x |
| Package Manager | **pnpm** (mandatory) |
| Node | v24 |
| Deploy | AWS Amplify (region: eu-west-2 London) |

---

## Local development

```bash
pnpm install            # install dependencies
pnpm run dev            # local dev server at localhost:4321
pnpm run build          # production build to ./dist/
pnpm run preview        # preview the production build
```

---

## Deployment

- AWS account: **StacksolverUK_Prod (280924795617)**
- Region: **eu-west-2 (London)**
- Deploy: AWS Amplify, auto-build from `main` branch
- DNS: Route 53 hosted zone `Z007907539JBYR4RHZRWO`
- Build pipeline: see [`amplify.yml`](amplify.yml)

---

## Security

- 2FA on the GitHub account: YubiKey + Touch ID
- Dependabot: enabled
- Hardening: CSP + HTTP security headers
- All commands run via `pnpm`

---

## Status

This codebase replaces the previous abandoned `stacksolveruk.com` deployment. Several internal pages
currently use placeholder copy in British English while the detailed content is being prepared —
see [`TRANSLATION_PENDING.md`](TRANSLATION_PENDING.md) for the punch list.
