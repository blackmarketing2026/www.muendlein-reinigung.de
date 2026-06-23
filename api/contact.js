const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, unternehmen, email, ort, leistung, art, nachricht } = req.body;

  if (!name || !email || !nachricht) {
    return res.status(400).json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' });
  }

  const lines = [
    `<strong>Name:</strong> ${escapeHtml(name)}`,
    unternehmen ? `<strong>Unternehmen:</strong> ${escapeHtml(unternehmen)}` : null,
    `<strong>E-Mail:</strong> ${escapeHtml(email)}`,
    ort ? `<strong>Ort:</strong> ${escapeHtml(ort)}` : null,
    leistung ? `<strong>Leistung:</strong> ${escapeHtml(leistung)}` : null,
    art ? `<strong>Reinigungsart:</strong> ${escapeHtml(art)}` : null,
    `<br><strong>Nachricht:</strong><br>${escapeHtml(nachricht).replace(/\n/g, '<br>')}`,
  ].filter(Boolean);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: ['muendlein@function-concept.de', 'Info@cleanteam-group.com'],
      replyTo: email,
      subject: `Neue Reinigungsanfrage von ${name}`,
      html: `<div style="font-family:sans-serif;line-height:1.6">${lines.join('<br>')}</div>`,
    });

    return res.redirect(303, '/danke');
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
