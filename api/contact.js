let Resend;
try { Resend = require('resend').Resend; } catch (e) { Resend = null; }

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = body.Name || '';
  const unternehmen = body.Unternehmen || '';
  const email = body['E-Mail'] || '';
  const ort = body.Ort || '';
  const leistung = body.Leistung || '';
  const reinigungsart = body.Reinigungsart || '';
  const nachricht = body.Nachricht || '';

  if (Resend && process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && name && email && nachricht) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      const safeName = esc(name);
      const safeEmail = esc(email);
      const safeUnternehmen = unternehmen ? esc(unternehmen) : '';
      const safeOrt = ort ? esc(ort) : '';
      const safeLeistung = leistung ? esc(leistung) : '';
      const safeArt = reinigungsart ? esc(reinigungsart) : '';
      const safeNachricht = esc(nachricht).replace(/\n/g, '<br>');

      var detailRows = [
        { label: 'Name', value: safeName },
        safeUnternehmen && { label: 'Unternehmen', value: safeUnternehmen },
        { label: 'E-Mail', value: '<a href="mailto:' + safeEmail + '" style="color:#2D9CDB;text-decoration:none">' + safeEmail + '</a>' },
        safeOrt && { label: 'Ort', value: safeOrt },
        safeLeistung && { label: 'Leistung', value: safeLeistung },
        safeArt && { label: 'Reinigungsart', value: safeArt },
      ].filter(Boolean);

      var tableRows = detailRows.map(function (r) {
        return '<tr>' +
          '<td style="padding:10px 12px;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f0f0f0">' + r.label + '</td>' +
          '<td style="padding:10px 12px;color:#0F2F4A;font-size:14px;font-weight:600;border-bottom:1px solid #f0f0f0">' + r.value + '</td>' +
          '</tr>';
      }).join('');

      var now = new Date().toLocaleString('de-DE', {
        timeZone: 'Europe/Berlin',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      var replySubject = encodeURIComponent('Re: Ihre Reinigungsanfrage');
      var replyBody = encodeURIComponent('Guten Tag ' + name + ',\n\nvielen Dank für Ihre Anfrage.\n\n');

      var html = '<!DOCTYPE html>' +
        '<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
        '<body style="margin:0;padding:0;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif">' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 16px"><tr><td align="center">' +
        '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(15,47,74,0.08)">' +
        '<tr><td style="background:linear-gradient(135deg,#0F2F4A 0%,#1E6FA8 100%);padding:32px 40px;text-align:center">' +
        '<h1 style="margin:0 0 4px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px">Neue Reinigungsanfrage</h1>' +
        '<p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px">' + now + ' Uhr</p>' +
        '</td></tr>' +
        '<tr><td style="padding:28px 40px 0">' +
        '<p style="margin:0;color:#0F2F4A;font-size:15px;line-height:1.6">' +
        '<strong>' + safeName + '</strong>' + (safeUnternehmen ? ' (' + safeUnternehmen + ')' : '') + ' hat eine Anfrage &uuml;ber die Website gesendet.</p>' +
        '</td></tr>' +
        '<tr><td style="padding:24px 40px 0">' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' +
        '<td style="padding-right:8px" width="50%">' +
        '<a href="mailto:' + safeEmail + '?subject=' + replySubject + '&body=' + replyBody + '" style="display:block;text-align:center;background:#2D9CDB;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:14px 20px;border-radius:8px">&#9993;&ensp;E-Mail senden</a>' +
        '</td>' +
        '<td style="padding-left:8px" width="50%">' +
        '<a href="mailto:' + safeEmail + '" style="display:block;text-align:center;background:#0F2F4A;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:14px 20px;border-radius:8px">&#8618;&ensp;Direkt antworten</a>' +
        '</td>' +
        '</tr></table></td></tr>' +
        '<tr><td style="padding:28px 40px 0">' +
        '<p style="margin:0 0 12px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Kontaktdaten</p>' +
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;overflow:hidden">' +
        tableRows +
        '</table></td></tr>' +
        '<tr><td style="padding:28px 40px 0">' +
        '<p style="margin:0 0 12px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600">Nachricht</p>' +
        '<div style="background:#f9fafb;border-left:4px solid #2D9CDB;border-radius:0 8px 8px 0;padding:16px 20px;color:#0F2F4A;font-size:14px;line-height:1.7">' +
        safeNachricht +
        '</div></td></tr>' +
        '<tr><td style="padding:32px 40px 0"><hr style="border:none;border-top:1px solid #e5e7eb;margin:0"></td></tr>' +
        '<tr><td style="padding:20px 40px 32px;text-align:center">' +
        '<p style="margin:0 0 4px;color:#9ca3af;font-size:12px">Thomas M&uuml;ndlein Reinigung &middot; Solingen</p>' +
        '<p style="margin:0;color:#d1d5db;font-size:11px">Diese E-Mail wurde automatisch &uuml;ber das Kontaktformular gesendet.</p>' +
        '</td></tr>' +
        '</table>' +
        '</td></tr></table></body></html>';

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: ['muendlein@function-concept.de', 'Info@cleanteam-group.com'],
        replyTo: email,
        subject: 'Lead - Mündlein - ' + (leistung || 'Allgemeine Anfrage') + ' - ' + name,
        html: html,
      });

      console.log('Email sent successfully');
    } catch (err) {
      console.error('Resend error:', err);
    }
  } else {
    console.error('Resend not configured or missing fields. RESEND_API_KEY:', !!process.env.RESEND_API_KEY, 'RESEND_FROM_EMAIL:', !!process.env.RESEND_FROM_EMAIL, 'Resend loaded:', !!Resend);
  }

  return res.redirect(303, '/danke');
};

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
