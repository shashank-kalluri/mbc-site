import { NextResponse } from "next/server";

/** Speaker applications land in the UBC inbox as a formatted email, sent through
 *  Resend from our verified college.xyz domain. Reply-To is the applicant, so
 *  hitting reply in Gmail answers them directly. */

export const runtime = "nodejs";

const TO = process.env.SPEAKER_FORM_TO ?? "uniblockchainconferences@gmail.com";
const FROM = process.env.SPEAKER_FORM_FROM ?? "UBC Speakers <speakers@college.xyz>";

const NAVY = "#293C4B";
const ORANGE = "#EC8644";

type Payload = Record<string, unknown>;

/** Fields we read off the request, with the label used in the email. Order here
 *  is the order they appear in the message. */
const FIELDS: { key: string; label: string; required?: boolean; max: number }[] = [
  { key: "name", label: "Name", required: true, max: 120 },
  { key: "email", label: "Email", required: true, max: 200 },
  { key: "role", label: "Role / title", required: true, max: 160 },
  { key: "organization", label: "Company or university", required: true, max: 160 },
  { key: "links", label: "Links", max: 500 },
  { key: "format", label: "Preferred format", required: true, max: 80 },
  { key: "topics", label: "Topics", max: 400 },
  { key: "title", label: "Working title", required: true, max: 200 },
  { key: "abstract", label: "What the talk covers", required: true, max: 2000 },
  { key: "attendance", label: "Attendance", required: true, max: 80 },
  { key: "notes", label: "Anything else", max: 1200 },
];

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(v: unknown, max: number) {
  if (Array.isArray(v)) v = v.filter((x) => typeof x === "string").join(", ");
  if (typeof v !== "string") return "";
  return v.replace(/\s+$/g, "").trim().slice(0, max);
}

/** Cheap per-instance throttle. Serverless spreads requests across instances so
 *  this is a speed bump, not a wall — the honeypot does the rest. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 6;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

async function send(body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

function applicationEmail(values: Record<string, string>) {
  const rows = FIELDS.filter(({ key }) => values[key])
    .map(
      ({ key, label }) => `
        <tr>
          <td style="padding:14px 0 4px;font:600 11px/1.4 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#9CADB7;">${esc(label)}</td>
        </tr>
        <tr>
          <td style="padding:0 0 14px;border-bottom:1px solid rgba(41,60,75,.10);font:400 15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:${NAVY};white-space:pre-wrap;">${esc(values[key])}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#F4F3EF;padding:28px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px -28px rgba(41,60,75,.5);">
      <tr>
        <td style="background:${NAVY};padding:26px 30px;">
          <div style="font:600 11px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${ORANGE};">UBC 2026 · Speaker Application</div>
          <div style="margin-top:10px;font:700 26px/1.2 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#FFFFFF;">${esc(values.name)}</div>
          <div style="margin-top:4px;font:400 14px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:rgba(255,255,255,.6);">${esc(values.role)} · ${esc(values.organization)}</div>
        </td>
      </tr>
      <tr><td style="padding:14px 30px 26px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
      <tr>
        <td style="padding:16px 30px 24px;">
          <a href="mailto:${esc(values.email)}" style="display:inline-block;background:${ORANGE};color:#FFFFFF;text-decoration:none;font:600 14px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;padding:13px 22px;border-radius:999px;">Reply to ${esc(values.name)}</a>
        </td>
      </tr>
    </table>
    <p style="max-width:620px;margin:14px auto 0;font:400 12px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#9CADB7;text-align:center;">Submitted from universityblockchain.org/speak</p>
  </body></html>`;
}

function confirmationEmail(name: string) {
  return `<!doctype html><html><body style="margin:0;background:#F4F3EF;padding:28px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;">
      <tr><td style="background:${NAVY};padding:26px 30px;">
        <div style="font:600 11px/1 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${ORANGE};">UBC 2026</div>
        <div style="margin-top:10px;font:700 26px/1.2 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#FFFFFF;">We got your application</div>
      </td></tr>
      <tr><td style="padding:26px 30px;font:400 15px/1.65 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:${NAVY};">
        <p style="margin:0 0 14px;">Hi ${esc(name)},</p>
        <p style="margin:0 0 14px;">Thanks for putting your name in to speak at the University Blockchain Conference, November 20–21, 2026 at UT Austin.</p>
        <p style="margin:0 0 14px;">Our programming team reviews applications on a rolling basis and will get back to you as the agenda comes together. If we need anything else, we'll just reply to this thread.</p>
        <p style="margin:0;color:#5A6B78;">— The UBC team</p>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Hidden field no human ever sees. Bots fill it in.
  if (clean(payload.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many applications from this connection. Try again later." },
      { status: 429 }
    );
  }

  const values: Record<string, string> = {};
  const missing: string[] = [];
  for (const { key, label, required, max } of FIELDS) {
    const v = clean(payload[key], max);
    if (v) values[key] = v;
    else if (required) missing.push(label);
  }

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  try {
    await send({
      from: FROM,
      to: [TO],
      reply_to: values.email,
      subject: `Speaker application — ${values.name} (${values.organization})`,
      html: applicationEmail(values),
      text: FIELDS.filter(({ key }) => values[key])
        .map(({ key, label }) => `${label}:\n${values[key]}`)
        .join("\n\n"),
    });
  } catch (err) {
    console.error("[speaker-application] send failed", err);
    return NextResponse.json(
      { error: "We couldn't send your application. Please email us directly." },
      { status: 502 }
    );
  }

  // A receipt for the applicant is a nice-to-have; never fail the submission on it.
  try {
    await send({
      from: FROM,
      to: [values.email],
      reply_to: TO,
      subject: "We got your UBC 2026 speaker application",
      html: confirmationEmail(values.name),
      text: `Hi ${values.name},\n\nThanks for applying to speak at UBC 2026, November 20-21 at UT Austin. Our programming team reviews applications on a rolling basis and will get back to you as the agenda comes together.\n\n- The UBC team`,
    });
  } catch (err) {
    console.error("[speaker-application] confirmation failed", err);
  }

  return NextResponse.json({ ok: true });
}
