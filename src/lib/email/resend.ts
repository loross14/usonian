import { Resend } from 'resend'

// Initialize Resend client (only when API key is configured)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Default sender - update this with your verified domain
const DEFAULT_FROM = 'Usonian <hello@yourdomain.com>'

// Check if Resend is configured
export function isResendConfigured(): boolean {
  return resend !== null
}

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

/**
 * Send a single email
 */
export async function sendEmail(options: SendEmailOptions) {
  if (!resend) {
    console.warn('Resend not configured. Set RESEND_API_KEY to enable email sending.')
    return { success: false, error: 'Resend not configured' }
  }

  const { to, subject, html, text, from = DEFAULT_FROM, replyTo } = options

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error(error.message)
    }

    return { success: true, id: data?.id }
  } catch (error) {
    console.error('Email send failed:', error)
    throw error
  }
}

/**
 * Send batch emails (up to 100 at a time)
 */
export async function sendBatchEmails(
  emails: Array<{
    to: string
    subject: string
    html: string
    text?: string
  }>,
  from: string = DEFAULT_FROM
) {
  if (!resend) {
    console.warn('Resend not configured. Set RESEND_API_KEY to enable email sending.')
    return { success: false, error: 'Resend not configured' }
  }

  try {
    const { data, error } = await resend.batch.send(
      emails.map((email) => ({
        from,
        to: email.to,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }))
    )

    if (error) {
      console.error('Resend batch error:', error)
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Batch email send failed:', error)
    throw error
  }
}

/**
 * Newsletter email templates
 */
export const templates = {
  /**
   * Welcome email for new subscribers
   */
  welcome: (email: string) => ({
    to: email,
    subject: 'Welcome to Usonian',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #373432; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-weight: 400; color: #373432;">
            Welcome to Usonian
          </h1>
          <p>
            You're now part of a community that appreciates the artistry of mid-century modern architecture.
          </p>
          <p>
            We'll keep you updated on:
          </p>
          <ul>
            <li>New architect-designed homes</li>
            <li>Architect spotlights and stories</li>
            <li>Preservation news and events</li>
          </ul>
          <p style="color: #525a64; font-size: 14px; margin-top: 40px;">
            — The Usonian Team
          </p>
          <hr style="border: none; border-top: 1px solid #e8dac3; margin: 30px 0;">
          <p style="color: #8c9baf; font-size: 12px;">
            You received this email because you subscribed at usonian.com.
            <a href="{{unsubscribe_url}}" style="color: #c27254;">Unsubscribe</a>
          </p>
        </body>
      </html>
    `,
    text: `Welcome to Usonian

You're now part of a community that appreciates the artistry of mid-century modern architecture.

We'll keep you updated on:
- New architect-designed homes
- Architect spotlights and stories
- Preservation news and events

— The Usonian Team
    `,
  }),

  /**
   * New listing notification
   */
  newListing: (email: string, property: { name: string; architect: string; url: string }) => ({
    to: email,
    subject: `New Listing: ${property.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #373432; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="color: #c27254; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
            New Listing
          </p>
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-weight: 400; color: #373432; margin-top: 8px;">
            ${property.name}
          </h1>
          <p style="color: #525a64;">
            by ${property.architect}
          </p>
          <a href="${property.url}" style="display: inline-block; background: #c27254; color: white; padding: 12px 24px; text-decoration: none; margin-top: 20px;">
            View Property
          </a>
          <hr style="border: none; border-top: 1px solid #e8dac3; margin: 30px 0;">
          <p style="color: #8c9baf; font-size: 12px;">
            <a href="{{unsubscribe_url}}" style="color: #c27254;">Unsubscribe</a>
          </p>
        </body>
      </html>
    `,
    text: `New Listing: ${property.name}
by ${property.architect}

View Property: ${property.url}
    `,
  }),
}
