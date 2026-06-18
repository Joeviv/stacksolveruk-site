// File: infra/contact-lambda/index.mjs
// Contact-form handler for stacksolveruk.com.
// Standalone Lambda (Function URL) in eu-west-2 (London). Sends via Amazon SES.
// Decoupled from the static Amplify site: the form POSTs JSON here; nothing
// about the website build or deploy depends on this function.
//
// Runtime: Node.js 20.x (bundles AWS SDK v3 — no dependencies to install).
// Env vars: TO_EMAIL, FROM_EMAIL, ALLOW_ORIGIN, SES_REGION (optional).

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const REGION = process.env.SES_REGION || "eu-west-2";
const TO_EMAIL = process.env.TO_EMAIL;            // e.g. hello@foxfifth.com
const FROM_EMAIL = process.env.FROM_EMAIL;        // e.g. "Stacksolver UK <noreply@stacksolveruk.com>"
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || "https://www.stacksolveruk.com";

const ses = new SESClient({ region: REGION });

const cors = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const reply = (statusCode, body) => ({ statusCode, headers: cors, body: JSON.stringify(body) });

const isEmail = (v) => typeof v === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const clean = (v, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const handler = async (event) => {
  const method = event?.requestContext?.http?.method;
  if (method === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (method !== "POST") return reply(405, { errors: [{ message: "Method not allowed." }] });

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return reply(400, { errors: [{ message: "Invalid request body." }] });
  }

  // Honeypot — silently accept and drop bot submissions.
  if (clean(data._gotcha)) return reply(200, { ok: true });

  const name = clean(data.name, 200);
  const email = clean(data.email, 320);
  const organisation = clean(data.organisation, 200);
  const phone = clean(data.phone, 60);
  const topic = clean(data.topic, 120);
  const message = clean(data.message, 5000);

  if (!name || !isEmail(email) || !topic || !message) {
    return reply(422, { errors: [{ message: "Please complete the required fields with a valid email." }] });
  }

  const text =
    `New enquiry from stacksolveruk.com\n\n` +
    `Name:         ${name}\n` +
    `Email:        ${email}\n` +
    `Organisation: ${organisation || "—"}\n` +
    `Phone:        ${phone || "—"}\n` +
    `Topic:        ${topic}\n\n` +
    `Message:\n${message}\n`;

  try {
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New enquiry (${topic}) — stacksolveruk.com`, Charset: "UTF-8" },
        Body: { Text: { Data: text, Charset: "UTF-8" } },
      },
    }));
    return reply(200, { ok: true });
  } catch (err) {
    console.error("SES send failed:", err?.name, err?.message);
    return reply(502, { errors: [{ message: "We could not send your message. Please email us directly." }] });
  }
};
