/**
 * SITE-WIDE CONTACT SETTINGS  — edit these three values.
 */

/** Receives inquiries (and is the mailto fallback). */
export const CONTACT_EMAIL = 'connect@bezalelinc.com';

/**
 * WhatsApp number in international format, digits only (no + or spaces).
 * Example (Malaysia): '60123456789'. Leave '' to hide all WhatsApp buttons.
 */
export const WHATSAPP_NUMBER = '';

/**
 * Form endpoint that emails you each submission (e.g. a free Formspree or
 * Web3Forms URL). While this is '' the form falls back to opening the
 * visitor's email app with the message pre-filled.
 * Example: 'https://formspree.io/f/xxxxxxxx'
 */
export const INQUIRY_ENDPOINT = '';

export const REPLY_PROMISE = 'Reply within 1 business day · No obligation';

export const whatsappLink = (text = 'Hello Bezalel Inc, I would like to enquire.') =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : '';
