import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = 'hello@cuttingedgebs.com'
const COMPANY = 'Competitive Edge Business Solutions'

function wrapper(body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      background: #F5F5F5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #1A1A1A;
    }
    .wrapper { padding: 32px 16px; }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .header {
      background: #0D0D0D;
      padding: 28px 32px;
    }
    .header-name {
      font-size: 18px;
      font-weight: 700;
      color: white;
      letter-spacing: -0.01em;
    }
    .header-tag {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      margin-top: 2px;
    }
    .accent-bar {
      height: 3px;
      background: #8B2FC9;
    }
    .body {
      padding: 36px 36px 28px;
    }
    p {
      font-size: 15px;
      color: #4A4A4A;
      line-height: 1.7;
      margin-bottom: 14px;
    }
    .highlight {
      background: rgba(139,47,201,0.06);
      border: 1px solid rgba(139,47,201,0.15);
      border-left: 4px solid #8B2FC9;
      border-radius: 10px;
      padding: 16px 20px;
      margin: 12px 0;
    }
    .highlight-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #8B2FC9;
      margin-bottom: 4px;
    }
    .highlight-value {
      font-size: 15px;
      color: #1A1A1A;
    }
    .footer {
      background: #0D0D0D;
      padding: 20px 32px;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      color: rgba(255,255,255,0.3);
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="header-name">Competitive Edge Business Solutions</div>
        <div class="header-tag">Custom Technology &amp; Strategy</div>
      </div>
      <div class="accent-bar"></div>
      <div class="body">
        ${body}
      </div>
      <div class="footer">
        <p>Competitive Edge Business Solutions &nbsp;·&nbsp; cuttingedgebs.com</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

export async function sendAuditConfirmation(params: {
  fullName: string
  email: string
  businessName: string
}): Promise<void> {
  const firstName = params.fullName.split(' ')[0] || 'there'

  const body = `
    <p style="font-size:20px;font-weight:700;color:#1A1A1A;margin-bottom:16px;">
      Got it, ${firstName}.
    </p>
    <p>
      We received your consultation request for <strong>${params.businessName}</strong>
      and we'll take a look within 1–2 business days.
    </p>
    <p>
      When we reach out we'll walk you through exactly what we found — specific tools,
      specific costs, and specific recommendations. No pitch, just the truth.
    </p>
    <div class="highlight">
      <div class="highlight-label">What happens next</div>
      <div class="highlight-value">
        We review your submission, identify opportunities, and reach out to schedule a quick call.
      </div>
    </div>
    <p>If you have any questions reply to this email directly.</p>
    <p style="margin-top:24px;padding-top:20px;border-top:1px solid #E5E7EB;font-size:14px;color:#1A1A1A;font-weight:700;">
      The Competitive Edge Team
    </p>
  `

  await getResend().emails.send({
    from: `${COMPANY} <${FROM}>`,
    to: params.email,
    subject: `We got your consultation request — ${params.businessName}`,
    html: wrapper(body),
  })
}

export async function sendLeadNotification(params: {
  fullName: string
  businessName: string
  email: string
  phone: string
  industry: string
  challenge: string
  monthlySpend: string
  hearAboutUs: string
}): Promise<void> {
  const fields = [
    { label: 'Name', value: params.fullName },
    { label: 'Business', value: params.businessName },
    { label: 'Email', value: params.email },
    { label: 'Phone', value: params.phone || 'Not provided' },
    { label: 'Industry', value: params.industry || 'Not specified' },
    { label: 'Monthly Spend', value: params.monthlySpend || 'Not provided' },
    { label: 'Biggest Challenge', value: params.challenge },
    { label: 'Heard About Us', value: params.hearAboutUs || 'Not specified' },
  ]

  const highlights = fields
    .map(
      (f) => `
      <div class="highlight">
        <div class="highlight-label">${f.label}</div>
        <div class="highlight-value">${f.value}</div>
      </div>
    `
    )
    .join('')

  const body = `
    <p style="font-size:18px;font-weight:700;color:#1A1A1A;margin-bottom:16px;">
      New consultation request
    </p>
    ${highlights}
  `

  await getResend().emails.send({
    from: `${COMPANY} <${FROM}>`,
    to: FROM,
    subject: `New lead: ${params.businessName}`,
    html: wrapper(body),
  })
}
