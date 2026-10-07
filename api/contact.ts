type ContactRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ContactResponse = {
  status: (code: number) => ContactResponse;
  json: (body: Record<string, unknown>) => void;
  setHeader: (name: string, value: string) => void;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  care?: unknown;
  message?: unknown;
  company?: unknown;
  lang?: unknown;
  startedAt?: unknown;
};

const allowedOrigins = new Set([
  "https://lightofbirth.cz",
  "https://www.lightofbirth.cz",
  "https://lightofbirth.com",
  "https://www.lightofbirth.com",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default async function handler(request: ContactRequest, response: ContactResponse) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const originHeader = request.headers.origin;
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader;
  const isProduction = process.env.VERCEL_ENV === "production";

  if (isProduction && (!origin || !allowedOrigins.has(origin))) {
    return response.status(403).json({ error: "Origin not allowed" });
  }

  const payload = (request.body ?? {}) as ContactPayload;
  const name = text(payload.name, 120);
  const email = text(payload.email, 254).toLowerCase();
  const care = text(payload.care, 200);
  const message = text(payload.message, 4000);
  const company = text(payload.company, 200);
  const lang = payload.lang === "en" ? "en" : "cs";
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;

  // Silently accept bot submissions so the form does not reveal the trap.
  if (company || !startedAt || Date.now() - startedAt < 2500) {
    return response.status(200).json({ ok: true });
  }

  if (!name || !emailPattern.test(email) || !care || !message) {
    return response.status(400).json({ error: "Invalid form data" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "eeislerova@gmail.com";

  if (!apiKey || !from) {
    return response.status(503).json({ error: "Contact form is not configured" });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: lang === "cs" ? `Poptávka péče: ${name}` : `Care inquiry: ${name}`,
      text: [
        `Jazyk / Language: ${lang.toUpperCase()}`,
        `Jméno / Name: ${name}`,
        `E-mail: ${email}`,
        `Péče / Care: ${care}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!resendResponse.ok) {
    return response.status(502).json({ error: "Email delivery failed" });
  }

  return response.status(200).json({ ok: true });
}
