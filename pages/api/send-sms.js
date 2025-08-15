import { sendSMS as textlkSendSMS } from 'textlk-node';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber, message, senderId, apiToken } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'phoneNumber is required' });
  }

  if (!message) {
    return res.status(400).json({ success: false, error: 'message is required' });
  }

  try {
    const result = await textlkSendSMS({
      phoneNumber,
      message,
      senderId: senderId || process.env.TEXTLK_SENDER_ID,
      apiToken: apiToken || process.env.TEXTLK_API_TOKEN
    });

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error('TextLK Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
