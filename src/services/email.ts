import emailjs from '@emailjs/browser'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? ''

/**
 * Sends the contact form via EmailJS. Requires three env vars to be set
 * (see .env.example). Throws if they're missing so the UI can surface a
 * clear error instead of silently failing.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'Email service is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env'
    )
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: payload.name,
      from_email: payload.email,
      subject: payload.subject,
      message: payload.message,
    },
    { publicKey: PUBLIC_KEY }
  )
}
