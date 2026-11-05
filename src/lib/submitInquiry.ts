import { CONTACT_EMAIL, INQUIRY_ENDPOINT, WEB3FORMS_ACCESS_KEY, WEB3FORMS_VENTURE_IDS, SITE_LABEL } from '../config';

export interface InquiryPayload {
  name: string;
  email: string;
  audience?: string;
  venture?: string;
  /** Venture id, used to decide whether this enquiry goes through Web3Forms. */
  ventureId?: string;
  phone?: string;
  organisation?: string;
  message?: string;
  source?: string;
  /** Hidden spam-trap field. Real visitors leave it empty. */
  botcheck?: string;
}

/** Returns 'sent' when delivered to the endpoint, 'mailto' when the email app was opened. */
export async function submitInquiry(data: InquiryPayload): Promise<'sent' | 'mailto'> {
  if (
    INQUIRY_ENDPOINT &&
    WEB3FORMS_ACCESS_KEY &&
    data.ventureId &&
    WEB3FORMS_VENTURE_IDS.includes(data.ventureId)
  ) {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `[${SITE_LABEL}] ${data.venture ? data.venture + ' — ' : ''}New enquiry from ${data.name}`,
      from_name: `${SITE_LABEL} Website`,
      replyto: data.email,
      name: data.name,
      email: data.email,
      'Interested in': data.venture || '—',
      Organisation: data.organisation || '—',
      phone: data.phone || '—',
      message: data.message || '(no message)',
      Source: `${SITE_LABEL} — ${data.source || 'website'} (${window.location.pathname})`,
      botcheck: data.botcheck || '',
    };
    const res = await fetch(INQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}) as { success?: boolean });
    if (!res.ok || !(json.success || json.ok)) throw new Error('Submission failed');
    return 'sent';
  }
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.audience && `I am a: ${data.audience}`,
    data.venture && `Interested in: ${data.venture}`,
    data.organisation && `Organisation: ${data.organisation}`,
    data.phone && `Phone: ${data.phone}`,
    '',
    data.message || '',
  ].filter((l): l is string => typeof l === 'string');
  const subject = `Consultation request — ${data.name}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines.join('\n'))}`;
  return 'mailto';
}
