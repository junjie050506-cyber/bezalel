import { CONTACT_EMAIL, INQUIRY_ENDPOINT } from '../config';

export interface InquiryPayload {
  name: string;
  email: string;
  audience?: string;
  venture?: string;
  phone?: string;
  organisation?: string;
  message?: string;
  source?: string;
}

/** Returns 'sent' when delivered to the endpoint, 'mailto' when the email app was opened. */
export async function submitInquiry(data: InquiryPayload): Promise<'sent' | 'mailto'> {
  if (INQUIRY_ENDPOINT) {
    const res = await fetch(INQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, page: window.location.pathname }),
    });
    if (!res.ok) throw new Error('Submission failed');
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
  ].filter((l) => l !== undefined && l !== false) as string[];
  const subject = `Consultation request — ${data.name}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(lines.join('\n'))}`;
  return 'mailto';
}
