# Contact form — AWS SES + Lambda (London, eu-west-2)

Self-hosted replacement for Formspree. Contact-form data stays inside Stacksolver's
own AWS account, in the UK region. No third-party form processor, no US transfer.

**Decoupled by design:** this Lambda has its own Function URL. The static Amplify
site is untouched until the final one-line endpoint swap — so the live site carries
zero risk while this is being set up.

```
Browser form  ──POST JSON──▶  Lambda Function URL (eu-west-2)  ──SES──▶  your inbox
```

## What you provision (≈30–45 min, then a sandbox wait)

All in **region eu-west-2 (London)**.

### 1. SES — verify the sending domain
- SES console → Identities → Create identity → Domain → `stacksolveruk.com`.
- Enable **Easy DKIM**. SES gives 3 CNAME records → add them to the site's DNS
  (Route 53 or wherever the domain is managed). Verification completes once DNS propagates.
- Add a recipient identity too if needed: while in the **SES sandbox** you can only send
  to verified addresses, so verify the recipient inbox (e.g. `hello@foxfifth.com`) as well.
- For a contact form that only emails your own inbox, sandbox is fine to start. To send to
  any address later, request **production access** (Account → Request production access, ~24h).

### 2. IAM — execution role
- Create a Lambda execution role with `AWSLambdaBasicExecutionRole` (logs) **plus** the
  inline policy in `iam-policy.json` (scoped to `ses:SendEmail` from `noreply@stacksolveruk.com`).

### 3. Lambda — the function
- Create function → Author from scratch → Node.js 20.x → region eu-west-2 → use the role above.
- Paste `index.mjs` as the handler (handler = `index.handler`).
- Environment variables:
  - `TO_EMAIL` = recipient inbox — currently `johann@stacksolver.tech` (provisional, used
    only because stacksolveruk.com email is not live yet; never exposed to site visitors).
    Move to a branded `stacksolveruk.com` / `foxfifth.com` inbox once Workspace email is up.
    In the SES sandbox this address must be verified as an identity to receive.
  - `FROM_EMAIL` = `Stacksolver UK <noreply@stacksolveruk.com>` (must be on the verified domain)
  - `ALLOW_ORIGIN` = `https://www.stacksolveruk.com`
- Configuration → **Function URL** → Auth type **NONE** → CORS: allow origin
  `https://www.stacksolveruk.com`, method `POST`, header `Content-Type`.
- Copy the Function URL.

### 4. Test (before any site change)
```bash
curl -i -X POST '<FUNCTION_URL>' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"you@yourdomain.com","topic":"general","message":"hello"}'
```
Expect `200 {"ok":true}` and an email in the inbox. Confirm before proceeding.

## What Claude does after the test passes
- Swap the form's `fetch` target in `src/components/ContactForm.tsx` from Formspree to the
  Function URL (POST JSON), keeping the same success/error UX.
- Update the Privacy Policy: remove the third-party form-processor / US-transfer implication;
  state that enquiries are processed via Stacksolver's own AWS (London) and emailed to the inbox.
- Build, verify, push.

> Hardening (later, optional): WAF or a simple rate limit on the Function URL; CAPTCHA if spam appears.
> The honeypot field already drops most bots.
