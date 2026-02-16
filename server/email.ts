import { getUncachableSendGridClient } from './sendgrid';
import type { Contact } from '@shared/schema';

const NOTIFICATION_EMAILS = [
  'sergio@grandoakspropertymaintenance.com',
  'grandoaks.pm@gmail.com',
];

function buildEmailHtml(contact: Contact): string {
  const submittedAt = new Date(contact.createdAt).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f3f4f1;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f1;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5A27 0%, #1a3d18 100%);padding:32px 40px;text-align:center;">
              <h2 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.5px;text-transform:uppercase;">Grand Oaks</h2>
              <p style="margin:4px 0 0;font-size:13px;font-weight:600;color:#a7c4a3;letter-spacing:1px;text-transform:uppercase;">Property Maintenance</p>
            </td>
          </tr>

          <!-- Orange Accent Bar -->
          <tr>
            <td style="background-color:#F47B20;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Subject Banner -->
          <tr>
            <td style="padding:28px 40px 16px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#2D5A27;letter-spacing:-0.5px;">
                🌳 New Service Request
              </h1>
              <p style="margin:8px 0 0;font-size:15px;color:#6b7280;font-weight:500;">
                Someone is looking for your help!
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;" />
            </td>
          </tr>

          <!-- Contact Details -->
          <tr>
            <td style="padding:24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                
                <!-- Name -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f9fafb;border-radius:10px;margin-bottom:8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top" style="padding-top:2px;">
                          <span style="font-size:20px;">👤</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                          <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#1f2937;">${escapeHtml(contact.fullName)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:8px;"></td></tr>

                <!-- Phone -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f9fafb;border-radius:10px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top" style="padding-top:2px;">
                          <span style="font-size:20px;">📞</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Phone</p>
                          <p style="margin:4px 0 0;font-size:17px;font-weight:700;color:#1f2937;">
                            <a href="tel:${escapeHtml(contact.phone)}" style="color:#2D5A27;text-decoration:none;">${escapeHtml(contact.phone)}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr><td style="height:8px;"></td></tr>

                <!-- Service Requested -->
                <tr>
                  <td style="padding:12px 16px;background-color:#FFF7ED;border-radius:10px;border:1px solid #FDBA74;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top" style="padding-top:2px;">
                          <span style="font-size:20px;">🌲</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Service Needed</p>
                          <p style="margin:4px 0 0;font-size:17px;font-weight:800;color:#F47B20;">${escapeHtml(contact.service)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${contact.message ? `
                <tr><td style="height:8px;"></td></tr>

                <!-- Message -->
                <tr>
                  <td style="padding:12px 16px;background-color:#f9fafb;border-radius:10px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" valign="top" style="padding-top:2px;">
                          <span style="font-size:20px;">💬</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#374151;line-height:1.6;">${escapeHtml(contact.message)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td style="padding:8px 40px 24px;text-align:center;">
              <a 
                href="tel:${escapeHtml(contact.phone)}" 
                style="display:inline-block;background-color:#F47B20;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:10px;box-shadow:0 2px 8px rgba(244,123,32,0.3);"
              >
                Call ${escapeHtml(contact.fullName)} Now
              </a>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td style="padding:0 40px 24px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#9ca3af;">
                Submitted on ${submittedAt}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a3d18;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#a7c4a3;font-weight:600;">
                Grand Oaks Property Maintenance
              </p>
              <p style="margin:6px 0 0;font-size:13px;color:#7da87a;">
                Pasco County, Florida &bull; (813) 860-7086
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#5a8a57;">
                This is an automated notification from your website contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactNotification(contact: Contact): Promise<void> {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();

    const msg = {
      to: NOTIFICATION_EMAILS,
      from: {
        email: fromEmail,
        name: 'Grand Oaks Website',
      },
      subject: `🌲 Service Needed: ${contact.service} — ${contact.fullName}`,
      html: buildEmailHtml(contact),
    };

    await client.send(msg);
    console.log(`Contact notification email sent for submission #${contact.id}`);
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
  }
}
