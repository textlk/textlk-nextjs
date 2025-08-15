# textlk-nextjs

**A secure Next.js wrapper for the [Text.lk SMS Gateway API in Sri Lanka](https://text.lk/).**
Easily send SMS messages from your Next.js app, with environment variable support and server-side safety. Fully compatible with TypeScript and JavaScript. Secure and easy to use.

---

## 🚀 Features

* Server-side safe API route for sending SMS.
* Simple client-side helper to call the API.
* Supports environment variables or per-request overrides.
* Works in both **JavaScript** and **TypeScript**.
* Lightweight and dependency-free (except `textlk-node`).

---

## 💿 Installation

```bash
npm install textlk-nextjs
```

---

## ⚙️ Setup

Create a `.env.local` file at the root of your Next.js project:

```env
TEXTLK_API_TOKEN=your_api_token_here
TEXTLK_SENDER_ID=TextLKDemo
```

* `TEXTLK_API_TOKEN`: Your API token from Text.lk.
* `TEXTLK_SENDER_ID`: Default sender ID for your SMS messages.

> ⚠️ Never expose your API token in the frontend. Always use server-side API routes.

---

## 🧩 Usage

### 1️⃣ Server-Side API Route

Add the provided server API route:

**`/pages/api/send-sms.js`**

```javascript
import { sendSMS as textlkSendSMS } from 'textlk-node';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { phoneNumber, message, senderId, apiToken } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ success: false, error: 'phoneNumber and message are required' });
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
```

---

### 2️⃣ Client-Side Helper

**`/lib/textlk.js`**

```javascript
export async function sendSMS({ phoneNumber, message, senderId, apiToken }) {
  if (!phoneNumber || !message) throw new Error('phoneNumber and message are required');

  const response = await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, message, senderId, apiToken })
  });

  return await response.json();
}
```

---

### 3️⃣ Example Usage in a Component

```javascript
import { useState } from 'react';
import { sendSMS } from '../lib/textlk';

export default function SMSForm() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    setStatus('Sending...');
    const result = await sendSMS({ phoneNumber: phone, message });
    setStatus(result.success ? 'SMS sent!' : `Error: ${result.error}`);
  };

  return (
    <div>
      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={handleSend}>Send SMS</button>
      <p>{status}</p>
    </div>
  );
}
```

---

## 🔧 Per-Request Overrides

You can override the default sender ID and API token:

```javascript
await sendSMS({
  phoneNumber: '94710000000',
  message: 'Custom sender ID!',
  senderId: 'CustomSender',
  apiToken: 'custom_api_token'
});
```

---

## 📌 Notes

* **Server-side only**: Never call `textlk-node` directly in the browser.
* Supports both **JavaScript** and **TypeScript**.
* Lightweight wrapper with no extra dependencies except `textlk-node`.
* Handles errors gracefully and returns JSON responses.

---

## 📝 License

MIT License © [year] Text.lk SMS Gateway Sri Lanka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

--
