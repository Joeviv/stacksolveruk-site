// File: src/data/legal/index.ts
// Public legal documents — content imported from Markdown source in
// 01_STAKEHOLDERS/01ST02_StackSolver_UK/02_Biblioteca/02_Compliance_Trust_Signals/

export type LegalDoc = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  reviewDate: string;
  nextReview: string;
  signatories?: string[];
  body: string;
};

const LAST_REVIEWED = '25 April 2026';
const NEXT_REVIEW_ANNUAL = '25 April 2027';
const NEXT_REVIEW_TRIANNUAL = '25 April 2029';

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: 'modern-slavery',
    title: 'Modern Slavery and Human Trafficking Statement',
    shortTitle: 'Modern Slavery',
    category: 'Statement',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    signatories: ['Johann Vivas, Director', 'Ferdie Langdon, Director'],
    body: `## 1. Introduction

Stacksolver UK Limited ("Stacksolver", "we", "us", "our") is a Brighton-based technology consultancy delivering cyber security, AI engineering, and governance, risk and compliance (GRC) services to clients across the United Kingdom, the European Union and the United States.

This statement is made on a voluntary basis. Stacksolver UK Limited is not currently within the scope of section 54 of the Modern Slavery Act 2015 (the "Act"), which applies to commercial organisations with an annual turnover of £36 million or more. We publish this statement because we recognise that modern slavery is a global issue, that every business — regardless of size — has a role to play in preventing it, and that our clients and partners are entitled to understand the standards by which we operate.

This statement sets out the steps Stacksolver has taken, and continues to take, to ensure that modern slavery and human trafficking are not taking place within our own operations or our supply chain.

## 2. Our Business

Stacksolver UK Limited is a Private Limited Company incorporated in England and Wales (Company Number 16227080), with its registered office at 215 Ditchling Road, Brighton, BN1 6JD. We operate as a small, lean consultancy. Our delivery model relies primarily on a small core team supported by carefully selected independent professionals (subcontractors operating through their own limited companies in accordance with UK self-employment rules) engaged on a per-project basis. We do not operate physical manufacturing facilities, distribution networks, or large-scale labour operations.

The majority of our work is delivered remotely from within the United Kingdom and the European Economic Area to clients in regulated industries, including financial services, healthcare and life sciences, professional services, technology, and corporate services.

## 3. Our Commitment

Stacksolver is committed to:

- Conducting all of our business in an honest and ethical manner, with a zero-tolerance approach to modern slavery, forced labour, child labour, and human trafficking in any form.
- Acting with integrity in all our business relationships and ensuring that effective systems and controls are in place to prevent slavery and human trafficking from taking place anywhere in our supply chain.
- Expecting the same standards from those with whom we contract, including subcontractors, suppliers, and other business partners.

These commitments are embedded in our internal policies and supplier engagement practices.

## 4. Our Supply Chain

Given the nature of our services, our supply chain is concentrated and low-risk relative to industries such as manufacturing, agriculture, or extractives. Our principal categories of suppliers are:

- **Independent professional contractors** delivering consultancy work alongside our core team.
- **Cloud infrastructure providers** (for example AWS, Microsoft, and similar enterprise platforms).
- **Software-as-a-Service vendors** for productivity, security, and collaboration tools.
- **Professional services providers** (legal, accounting, insurance, certification bodies).
- **Hardware suppliers** for computing equipment used by our team.

We assess the modern slavery risk of our supply chain to be low, but we do not consider it to be zero. We take this assessment seriously and act accordingly.

## 5. Policies and Due Diligence

We maintain the following policies and procedures aligned with our commitment under this statement:

- **Anti-Bribery and Anti-Corruption Statement** — outlining our zero-tolerance approach to bribery in any form.
- **Whistleblowing Policy** — providing a confidential channel for any worker or partner to raise concerns, including suspected modern slavery, without fear of retaliation.
- **Equal Opportunities Statement** — reaffirming our commitment to fair treatment and non-discrimination.
- **Subcontractor Engagement Process** — including identity verification, right-to-work checks (where applicable under UK immigration law), confirmation of corporate status, and contractual clauses requiring compliance with all applicable laws including the Modern Slavery Act 2015.
- **Vendor Onboarding Procedure** — applied to material new suppliers, requesting confirmation of their own ethical and modern slavery practices where appropriate to the engagement.

Where a supplier is unable or unwilling to confirm alignment with our standards, we reserve the right to decline or terminate the relationship.

## 6. Training and Awareness

Modern slavery awareness forms part of the onboarding process for every member of our core team. Subcontractors engaged on our behalf are required, by contract, to act in accordance with applicable laws including the Modern Slavery Act 2015 and to report any concerns to us.

Given the size of our organisation, training is delivered on a proportionate basis: short, focused briefings rather than extensive formal programmes. We commit to keeping the content current and to escalate the depth of training as we grow.

## 7. Reporting Concerns

Anyone — whether a member of our team, a subcontractor, a supplier, a client, or a member of the public — who has a concern about modern slavery practices in any part of our business or supply chain may raise that concern in confidence by contacting us at **office@stacksolveruk.com**, marking the message clearly as confidential. Concerns will be treated seriously, investigated promptly, and addressed in accordance with our Whistleblowing Policy.

We will not tolerate any form of retaliation against an individual who, in good faith, raises a concern under this statement.

## 8. Governance and Approval

Responsibility for compliance with this statement sits with the Directors of Stacksolver UK Limited. Operational responsibility for day-to-day implementation rests with the Director responsible for operations and compliance.

This statement is reviewed annually and updated as appropriate. It is approved by the board of directors of Stacksolver UK Limited.`,
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    shortTitle: 'Privacy',
    category: 'Policy',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. About this Privacy Policy

Stacksolver UK Limited ("Stacksolver", "we", "us", "our") is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, share, and protect personal data when you visit our website (stacksolveruk.com), engage with us as a prospective client, contract with us as a client, or interact with us in any other capacity.

This policy is issued in accordance with the United Kingdom General Data Protection Regulation ("UK GDPR"), the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations 2003 ("PECR").

## 2. Data Controller

The data controller responsible for your personal data is:

**Stacksolver UK Limited**
215 Ditchling Road, Brighton, BN1 6JD, United Kingdom
Company Number: 16227080
ICO Registration: pending — to be added once registered
Email: office@stacksolveruk.com

If you have any question about this policy or about how we process your personal data, you may contact us at the address above.

## 3. Personal Data We Collect

We may collect and process the following categories of personal data:

- **Identity** — name, job title, employer (you provide directly).
- **Contact** — email, phone, postal address (you provide directly).
- **Professional** — industry, role, organisation size (you provide directly).
- **Technical** — IP address, browser type, device, operating system (automatically when you visit).
- **Usage** — pages visited, time spent, referrer (automatically through analytics).
- **Communications** — messages exchanged, meeting notes (when you communicate with us).
- **Marketing preferences** — opt-in / opt-out status (you provide directly).

We do not knowingly collect special category data (UK GDPR Art. 9) such as health, biometric, religious or political data.

## 4. Lawful Bases for Processing

We process personal data on one or more of the following lawful bases (UK GDPR Art. 6):

- **Consent (Art. 6(1)(a))** — for marketing communications and non-essential cookies.
- **Contract (Art. 6(1)(b))** — to perform a contract with you or take pre-contract steps you have requested.
- **Legal obligation (Art. 6(1)(c))** — to comply with HMRC, Companies House, ICO or other regulatory requirements.
- **Legitimate interests (Art. 6(1)(f))** — to operate our business, prevent fraud, secure our systems and respond to enquiries. We have assessed these interests against your rights and freedoms.

## 5. Purposes of Processing

We use personal data for the following purposes:

1. To respond to enquiries you submit through our website or other channels.
2. To deliver consultancy services agreed in a written contract with you or your organisation.
3. To manage our supplier and subcontractor relationships.
4. To send relevant business communications where you have consented or where there is a legitimate interest.
5. To maintain accurate financial and corporate records as required by law.
6. To improve our website and services through aggregated analytics.
7. To comply with any legal, regulatory or audit requirement.

## 6. Sharing Your Personal Data

We do not sell personal data. We may share your data with:

- **Cloud and software providers** acting as data processors on our behalf (Google Workspace, AWS, our analytics provider). All such processors are bound by Article 28 data processing agreements.
- **Professional advisors** (legal, accounting, insurance) where necessary.
- **Regulators and law enforcement** where required by law.
- **Subcontractors** engaged on a specific client project, only to the extent strictly necessary.

## 7. International Transfers

Some of our service providers may process personal data outside the United Kingdom. Where we transfer personal data outside the UK or the European Economic Area, we ensure appropriate safeguards are in place, such as the UK International Data Transfer Agreement, the UK Addendum to the EU Standard Contractual Clauses, or transfers to jurisdictions with an adequacy decision recognised by the UK government.

## 8. How Long We Keep Personal Data

We retain personal data only as long as necessary for the purposes for which it was collected.

- Enquiry data (no engagement): 24 months from last contact.
- Client engagement data: duration of contract + 7 years (HMRC requirement).
- Marketing preferences: until you withdraw consent or opt out.
- Website analytics (aggregated): 26 months.
- Financial records: 7 years (Companies Act / HMRC).

## 9. Your Rights

Under the UK GDPR, you have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20), objection (Art. 21), withdrawal of consent at any time, and to lodge a complaint with the Information Commissioner's Office (ICO).

To exercise any of these rights, please contact us at office@stacksolveruk.com. We will respond within one calendar month, in line with UK GDPR.

You may also lodge a complaint with the ICO at https://ico.org.uk.

## 10. Security

We take appropriate technical and organisational measures to protect personal data against unauthorised access, disclosure, alteration or destruction. Our security posture is informed by the principles of ISO/IEC 27001:2022 and the UK National Cyber Security Centre Cyber Essentials scheme.

In the unlikely event of a personal data breach that poses a risk to your rights and freedoms, we will notify the ICO within 72 hours and, where required, notify affected individuals.

## 11. Cookies

Our use of cookies is described separately in our Cookie Policy.

## 12. Changes to this Policy

We review this policy at least annually and update it when our practices or applicable law change. Material changes will be highlighted on our website.`,
  },
  {
    slug: 'cookies',
    title: 'Cookie Policy',
    shortTitle: 'Cookies',
    category: 'Policy',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. About Cookies

A cookie is a small text file stored on your device when you visit a website. Cookies allow a site to recognise your device, remember preferences and gather analytics about how the site is used.

This Cookie Policy explains the cookies we use on stacksolveruk.com, why we use them and how you can control them. It supplements our Privacy Policy and complies with the Privacy and Electronic Communications Regulations 2003 ("PECR") and the UK GDPR.

## 2. Categories of Cookies

### Strictly Necessary Cookies
Required for the basic function of the website. These cannot be switched off.

- \`cookie_consent\` — stores your cookie preferences (12 months).
- \`session_id\` — maintains your session (session only).

### Analytics Cookies (require consent)
Help us understand how visitors use the site so we can improve it. Data is aggregated and does not identify individuals.

- \`_ga\`, \`_ga_*\` — Google Analytics 4 (or equivalent), distinguishes unique users (14 months).

### Marketing Cookies (require consent)
We do not currently use marketing cookies. If we add any in the future, this policy will be updated and consent re-collected.

## 3. Your Choices

When you visit our site for the first time, a cookie banner appears. You may accept all cookies (including analytics), reject non-essential cookies (only strictly necessary will be set), or customise your preferences for each category.

You may change your preferences at any time via the "Cookie Preferences" link in the footer. You may also block or delete cookies through your browser settings — note that blocking strictly necessary cookies may impair site functionality.

## 4. Third-Party Cookies

If our site embeds content from third-party services (for example a YouTube video, a LinkedIn share button, or a calendar booking widget), those services may set their own cookies governed by their own privacy notices. We endeavour to keep third-party embeds to a minimum and to load them only with consent where applicable.

## 5. Updates to this Policy

We review this policy at least annually and update it whenever our cookie usage changes.`,
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    shortTitle: 'Terms',
    category: 'Terms',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. About these Terms

These Terms of Service ("Terms") govern your use of the website operated by Stacksolver UK Limited ("Stacksolver", "we", "us", "our") at stacksolveruk.com (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.

These Terms apply to general use of the Site only. Engagements for paid consultancy services are governed separately by a written Master Services Agreement and Statement of Work signed by both parties.

## 2. Use of the Site

You agree to use the Site only for lawful purposes and in a manner consistent with these Terms. You agree not to:

- Use the Site in any way that violates applicable law or regulation.
- Attempt to gain unauthorised access to any part of the Site or its underlying systems.
- Use the Site to transmit malware, conduct phishing or any other malicious activity.
- Scrape, crawl or harvest content from the Site for automated purposes without our written consent.
- Misrepresent your identity or affiliation when contacting us.

## 3. Intellectual Property

All content on the Site — including text, graphics, logos, images, software and design — is the property of Stacksolver UK Limited or its licensors, protected by United Kingdom and international copyright, trade mark and other intellectual property laws.

You may view and print individual pages for your own non-commercial reference. You may not reproduce, redistribute, modify or commercially exploit any part of the Site without our prior written consent.

The trade mark "Stacksolver" and any associated logos are owned by us or our affiliates.

## 4. Information on the Site

We make reasonable efforts to ensure the information on the Site is accurate and current. However, the content is provided for general information only and does not constitute legal, financial, regulatory or other professional advice. Any reliance you place on Site content is at your own risk.

The descriptions of our services on the Site are indicative. The scope, deliverables, pricing and timelines of any specific engagement will be agreed in a written Statement of Work.

## 5. Third-Party Links

The Site may include links to third-party websites for your convenience. We do not control, endorse or assume responsibility for the content, privacy practices or operations of any third-party site. Your interactions with third-party sites are governed by their own terms.

## 6. Disclaimer

The Site is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we exclude all representations, warranties and conditions (whether express or implied) relating to the Site, including but not limited to warranties of accuracy, fitness for purpose, non-infringement and uninterrupted availability.

## 7. Limitation of Liability

To the fullest extent permitted by applicable law, Stacksolver UK Limited shall not be liable for any indirect, incidental, consequential, special or exemplary loss or damage arising from your use of, or inability to use, the Site, even if we have been advised of the possibility of such loss.

Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under English law.

## 8. Contact and Notices

For all enquiries about these Terms, contact:

**Stacksolver UK Limited**
215 Ditchling Road, Brighton, BN1 6JD
office@stacksolveruk.com

## 9. Governing Law and Jurisdiction

These Terms are governed by the laws of England and Wales. Any dispute arising from or connected with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.

## 10. Changes to these Terms

We may update these Terms from time to time. The current version is always available on the Site.`,
  },
  {
    slug: 'anti-bribery',
    title: 'Anti-Bribery and Anti-Corruption Statement',
    shortTitle: 'Anti-Bribery',
    category: 'Statement',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_TRIANNUAL,
    signatories: ['Johann Vivas, Director', 'Ferdie Langdon, Director'],
    body: `## 1. Our Position

Stacksolver UK Limited ("Stacksolver", "we", "us", "our") operates a strict zero-tolerance approach to bribery and corruption in any form. We are committed to acting professionally, fairly and with integrity in all business dealings and relationships, wherever we operate.

This statement is issued in accordance with the United Kingdom Bribery Act 2010 (the "Act"), which applies to all UK companies regardless of size and includes extraterritorial reach.

## 2. Scope

This statement applies to all directors and employees of Stacksolver UK Limited, all subcontractors, consultants, agents and other third parties acting on our behalf, and all business activities including procurement, sales, partnerships and government interactions.

We expect those with whom we contract to maintain equivalent standards.

## 3. The Six Offences We Prevent

We prohibit any conduct that could constitute, or could reasonably be perceived to constitute:

1. **Active bribery** — offering, promising or giving a financial or other advantage to influence improperly the conduct of another person.
2. **Passive bribery** — requesting, agreeing to receive or accepting a financial or other advantage in exchange for performing a relevant function improperly.
3. **Bribery of foreign public officials** (Section 6 of the Act) to obtain or retain business or business advantage.
4. **Failure to prevent bribery** by associated persons (Section 7 of the Act) — the corporate offence we actively guard against.
5. **Facilitation payments** of any kind, regardless of local custom or perceived urgency.
6. **Kickbacks** in any form.

## 4. Gifts, Hospitality and Entertainment

Reasonable and proportionate gifts and hospitality given or received in the normal course of business are acceptable, provided they are not made with the intention of influencing any decision improperly, are not excessive in value, are appropriate to the circumstances and would not embarrass us or the recipient if disclosed, and are recorded transparently in our books.

We will decline or return any gift or hospitality that does not meet these criteria. We will not offer or accept any payment in cash equivalent.

## 5. Charitable and Political Contributions

Stacksolver does not make political donations of any kind. Charitable contributions, where made, are documented and reviewed to ensure they are not used as a means of improperly influencing any decision-maker.

## 6. Subcontractor and Supplier Due Diligence

Before engaging a subcontractor, supplier or other third party in a position to influence our business outcomes, we conduct proportionate due diligence. Our standard subcontractor and supplier agreements include obligations to comply with all applicable anti-bribery and anti-corruption laws.

## 7. Reporting and Speak-Up

Any director, employee, contractor, supplier, client or member of the public who suspects a breach of this statement is encouraged to report it confidentially to **office@stacksolveruk.com**, marking the message clearly as confidential.

Reports are handled in accordance with our Whistleblowing Policy. We will not tolerate retaliation against any individual who, in good faith, raises a concern.

## 8. Training and Communication

All directors and employees receive briefing on this statement on joining and at least annually thereafter. Subcontractors are made aware of our position through onboarding documentation and contractual clauses.

## 9. Governance

Responsibility for compliance with this statement sits with the Directors of Stacksolver UK Limited. The board reviews this statement at least every three years, or sooner if relevant law or business circumstances change.`,
  },
  {
    slug: 'whistleblowing',
    title: 'Whistleblowing Policy',
    shortTitle: 'Whistleblowing',
    category: 'Policy',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. Purpose

Stacksolver UK Limited ("Stacksolver", "we", "us", "our") is committed to the highest standards of openness, integrity and accountability. This Policy provides a framework for any person — whether a member of our team, a subcontractor, a supplier, a client or any other interested party — to raise concerns about wrongdoing without fear of reprisal.

This Policy is informed by the Public Interest Disclosure Act 1998 ("PIDA") and aligned with UK corporate governance practice.

## 2. What this Policy Covers

This Policy applies to concerns about criminal activity (including fraud, corruption, bribery or theft), modern slavery or human trafficking, breaches of legal or regulatory obligations, risks to health, safety or welfare, damage to the environment, improper or unethical conduct (including discrimination, harassment or bullying), unauthorised use of our funds, data or assets, and the deliberate concealment of any of the above.

This Policy is not intended for personal grievances about employment terms, line management or interpersonal disputes — those should be raised through normal grievance channels.

## 3. How to Raise a Concern

Concerns may be raised:

- **By email** to office@stacksolveruk.com, marking the subject line "CONFIDENTIAL — SPEAK UP".
- **By post** in a sealed envelope marked "PRIVATE AND CONFIDENTIAL — DIRECTOR" addressed to: Stacksolver UK Limited, 215 Ditchling Road, Brighton, BN1 6JD.

You are encouraged to identify yourself when raising a concern, as this allows us to investigate more effectively and to keep you informed. However, anonymous concerns will also be considered.

## 4. Confidentiality

We will treat your concern in confidence to the fullest extent reasonably possible. Your identity will not be disclosed without your consent unless we are required to do so by law or unless disclosure is necessary to investigate the concern and we have given you prior notice.

## 5. Protection from Retaliation

Anyone who raises a concern in good faith under this Policy is protected from retaliation, victimisation, harassment or detriment of any kind. We treat any act of retaliation as a serious matter that may itself be subject to disciplinary action or termination of contract.

This protection applies even if the concern proves to be unfounded, provided it was raised honestly and in good faith. Knowingly false or malicious reports are not protected.

## 6. Investigation Process

When a concern is received, we will acknowledge receipt within five working days (where the reporter is identifiable), conduct an initial review, decide on the appropriate investigation pathway, maintain confidentiality on a need-to-know basis, and where reasonably possible provide the reporter with feedback on the outcome subject to legal and confidentiality constraints.

The Director responsible for compliance will oversee the process. Where the concern relates to a Director, the matter will be escalated to the other Director or to an external advisor independent of the subject of the concern.

## 7. External Channels

If you believe your concern has not been adequately addressed internally, or if you do not feel comfortable raising it with us, you may contact a "prescribed person" under PIDA. The relevant prescribed person depends on the nature of the concern (ICO for data protection breaches, HSE for health and safety, HMRC for tax fraud, FCA for financial misconduct, Action Fraud for criminal fraud, etc.).

A full list is available at https://www.gov.uk/whistleblowing. You may also seek free, independent advice from Protect, the UK's whistleblowing charity, at https://protect-advice.org.uk.

## 8. Records

We keep records of concerns raised, the investigations conducted and the outcomes — for the purposes of compliance, learning and accountability. Records are stored securely and in accordance with our data retention policies.

## 9. Governance

This Policy is owned by the Directors of Stacksolver UK Limited and reviewed annually.`,
  },
  {
    slug: 'equal-opportunities',
    title: 'Equal Opportunities Statement',
    shortTitle: 'Equal Opportunities',
    category: 'Statement',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. Our Commitment

Stacksolver UK Limited ("Stacksolver", "we", "us", "our") is committed to providing equal opportunities and to creating an inclusive environment in which every individual is treated with dignity and respect. We do not tolerate discrimination, harassment, victimisation or unfair treatment of any kind.

This statement is informed by the Equality Act 2010 and the principles of fair employment practice in the United Kingdom.

## 2. Scope

This statement applies to all directors and employees of Stacksolver UK Limited, all applicants for employment or engagement, all subcontractors, consultants, suppliers, clients and visitors, and all aspects of our business activity — including recruitment, engagement, training, allocation of work, advancement opportunities, day-to-day interactions and termination.

## 3. Protected Characteristics

We do not discriminate on the basis of any characteristic protected under the Equality Act 2010, namely age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race (including colour, nationality, ethnic or national origin), religion or belief, sex, and sexual orientation.

We additionally extend our commitment to non-discrimination on grounds not explicitly enumerated by statute but reflective of our values, including caring responsibilities, neurodivergence and socio-economic background.

## 4. Our Practices

In line with this statement we recruit on merit, make reasonable adjustments for individuals with disabilities or specific needs, engage subcontractors transparently with the same standards of professionalism and capability for all, promote a culture of respect where any form of harassment, bullying or microaggression is challenged and addressed, provide flexibility in working arrangements where the nature of the work allows, and pay fairly in accordance with the National Minimum Wage Act and applicable equal pay legislation.

## 5. Reporting Concerns

Any individual who believes they have experienced or witnessed discrimination, harassment or victimisation in the course of dealing with us is encouraged to raise the concern. Concerns may be raised through line management (where applicable), through our Whistleblowing Policy, or directly by email to office@stacksolveruk.com marked confidential.

We treat all concerns seriously, investigate them promptly and impartially, and take appropriate action where required.

## 6. Governance

Responsibility for this statement sits with the Directors of Stacksolver UK Limited. We review the statement at least annually.`,
  },
  {
    slug: 'acceptable-use',
    title: 'Acceptable Use Policy',
    shortTitle: 'Acceptable Use',
    category: 'Policy',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## 1. Purpose

This Acceptable Use Policy ("AUP") sets out the rules governing access to and use of the website operated by Stacksolver UK Limited ("Stacksolver", "we", "us", "our") at stacksolveruk.com (the "Site"), and any online tools, demonstrations or environments we make available to you.

By accessing or using the Site or any of our online resources, you agree to comply with this AUP. It supplements our Terms of Service.

## 2. Permitted Use

You may use the Site to view and navigate publicly available content, submit enquiries through our contact channels, download materials clearly marked as available for download, and engage with us in connection with a current or prospective consultancy engagement.

## 3. Prohibited Conduct

You must not, and must not attempt to:

- Use the Site for any unlawful purpose or in violation of any applicable law or regulation.
- Distribute, transmit or upload material that is harmful, defamatory, fraudulent or that infringes intellectual property rights.
- Use the Site to deliver spam, phishing, malware, viruses, ransomware or any other malicious code.
- Conduct unauthorised vulnerability scanning, penetration testing, denial-of-service attacks or any other security testing without our prior written consent.
- Attempt to gain unauthorised access to any part of the Site, our systems, our networks, our suppliers' systems or any data not intended for you.
- Reverse engineer, decompile or otherwise attempt to derive the source code of any software made available through the Site.
- Use automated means (bots, scrapers, crawlers, harvesters) to access, interrogate or extract data from the Site beyond what is permitted by our \`robots.txt\` file, without our prior written consent.
- Impersonate any person or entity, or misrepresent your affiliation with any person or entity.
- Use the Site to harass, threaten, defame or otherwise harm any individual.
- Interfere with or disrupt the operation of the Site or the servers or networks supporting it.

## 4. Authorised Security Research

If you believe you have identified a security vulnerability affecting the Site, we encourage responsible disclosure. Please contact us at office@stacksolveruk.com with a clear description, steps to reproduce, and your contact details. We will respond promptly and work with you in good faith to assess and remediate.

We do not currently operate a formal bug bounty programme but we appreciate and acknowledge contributions from the security research community.

## 5. Consequences of Breach

Violations of this AUP may result in suspension or termination of your access to the Site, restriction of access from your network or device, reporting to relevant law enforcement, regulatory or industry bodies, and civil legal action to recover loss caused by the breach.

## 6. Changes

We may update this AUP from time to time. The current version is always available on the Site.`,
  },
  {
    slug: 'ico-registration',
    title: 'ICO Registration',
    shortTitle: 'ICO Registration',
    category: 'Notice',
    reviewDate: LAST_REVIEWED,
    nextReview: NEXT_REVIEW_ANNUAL,
    body: `## Status

Stacksolver UK Limited is in the process of completing its registration with the United Kingdom Information Commissioner's Office (ICO) as a data controller under the Data Protection (Charges and Information) Regulations 2018.

Once registration is complete, this page will publish:

- **ICO Registration Number** (format: ZA######)
- **Date of registration**
- **Tier** (Tier 1, 2 or 3 — based on size and turnover)
- **Public listing** — link to the entry on the ICO Register of Fee Payers

## Why we publish this notice

Public ICO registration is a statutory requirement for organisations that process personal data. Publishing the registration number alongside our Privacy Policy is a basic trust signal expected by corporate procurement teams in supplier onboarding.

## Reference

ICO Register of Fee Payers: https://ico.org.uk/ESDWebPages/Search`,
  },
];

export function getDocBySlug(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
