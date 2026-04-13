import { Resend } from 'resend';

export const runtime = 'nodejs';

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
  }

  let data: ContactPayload;
  try {
    data = (await req.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const firstName = (data.firstName ?? '').trim();
  const lastName = (data.lastName ?? '').trim();
  const email = (data.email ?? '').trim();
  const subject = (data.subject ?? '').trim() || `Let's Connect`;
  const message = (data.message ?? '').trim();

  if (!message) {
    return Response.json({ error: 'Message is required' }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const displayName = [firstName, lastName].filter(Boolean).join(' ').trim();
  const text = [
    `Nama: ${displayName || '-'}`,
    `Email: ${email || '-'}`,
    '',
    message,
  ].join('\n');

  try {
    const result = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['raditya.rahman02@gmail.com'],
      subject,
      text,
      ...(email ? { replyTo: email } : {}),
    });

    return Response.json({ ok: true, id: result.data?.id ?? null });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to send email';
    return Response.json({ error: msg }, { status: 500 });
  }
}

