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
export const INQUIRY_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Web3Forms access key (public by design; it only lets people send email to
 * the inbox it was created for). Same key as the Mustard Seed & Co website,
 * so enquiries arrive in the same inbox. Leave '' to use the mailto fallback.
 */
export const WEB3FORMS_ACCESS_KEY = 'dfc9d21e-00c7-402e-8429-81b9cf1ff14b';

/**
 * Only enquiries for these ventures are sent through Web3Forms (this key's
 * inbox belongs to Mustard Seed & Co). Other ventures keep the mailto
 * fallback to CONTACT_EMAIL until they get their own key.
 */
export const WEB3FORMS_VENTURE_IDS = ['mustard-seed'];

/**
 * Phone number shown on the contact form for each venture (by venture id).
 * `display` is what visitors read; `tel` is the international number used
 * for the tap-to-call link.
 */
export const VENTURE_PHONES: Record<string, { display: string; tel: string }> = {
  'olive-vine': { display: '+60 14-330 7703', tel: '+60143307703' },
  'hur-on': { display: '011-1932 3307', tel: '+601119323307' },
  phroneo: { display: '011-1932 3307', tel: '+601119323307' },
  'mustard-seed': { display: '011-1930 3307', tel: '+601119303307' },
};

/** Site label used in email subjects / sender name so sites can be told apart. */
export const SITE_LABEL = 'Bezalel Inc';

export const REPLY_PROMISE = 'Reply within 1 business day · No obligation';

export const whatsappLink = (text = 'Hello Bezalel Inc, I would like to enquire.') =>
  WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : '';
