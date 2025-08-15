# ![textlk-nextjs](https://img.shields.io/badge/TextLK-Next.js-blue) textlk-nextjs

![npm](https://img.shields.io/npm/v/textlk-nextjs?color=blue) ![npm downloads](https://img.shields.io/npm/dt/textlk-nextjs) ![License: MIT](https://img.shields.io/badge/License-MIT-green)

**A secure Next.js wrapper for the [Text.lk SMS Gateway API](https://text.lk/) in Sri Lanka using `textlk-node`.**
Send SMS easily from your Next.js app, with environment variable support and server-side safety. Fully compatible with JavaScript and TypeScript. Secure and easy to use.

---

## 📋 Table of Contents

* [Features](#-features)
* [Installation](#-installation)
* [Setup](#-setup)
* [Usage](#-usage)

  * [Client-Side](#client-side)
  * [Server-Side Overrides](#server-side-overrides)
  * [Example Codes](#example-codes)

    * [1. Simple SMS](#1-simple-sms)
    * [2. Custom Sender ID or API Token](#2-custom-sender-id-or-api-token)
    * [3. Sending OTP Code](#3-sending-otp-code)
    * [4. Sending Notification Messages](#4-sending-notification-messages)
    * [5. Handling Errors Gracefully](#5-handling-errors-gracefully)
* [Notes](#-notes)
* [License](#-license)

---

## 🚀 Features

* Server-side safe SMS sending via Next.js.
* Simple client-side helper for easy integration.
* Supports environment variables or per-request overrides.
* Works in both **JavaScript** and **TypeScript**.
* Lightweight, only depends on `textlk-node`.

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

### Client-Side

```javascript
import { sendSMS } from 'textlk-nextjs';

await sendSMS({
  phoneNumber: '94710000000',
  message: 'Hello from TextLK!',
});
```

### Server-Side Overrides

```javascript
import { sendSMS } from 'textlk-nextjs';

await sendSMS({
  phoneNumber: '94710000000',
  message: 'Custom sender ID!',
  senderId: 'CustomSender',
  apiToken: 'your_custom_api_token',
});
```

---

## 📌 Example Codes

### 1️⃣ Simple SMS

```javascript
import { sendSMS } from 'textlk-nextjs';

async function sendSimpleSMS() {
  const result = await sendSMS({
    phoneNumber: '94710000000',
    message: 'Hello from TextLK!',
  });

  if (result.success) {
    console.log('SMS sent successfully!');
  } else {
    console.error('Error sending SMS:', result.error);
  }
}

sendSimpleSMS();
```

---

### 2️⃣ Custom Sender ID or API Token

```javascript
import { sendSMS } from 'textlk-nextjs';

async function sendCustomSMS() {
  const result = await sendSMS({
    phoneNumber: '94710000000',
    message: 'Custom sender ID example!',
    senderId: 'CustomSender',
    apiToken: 'your_custom_api_token',
  });

  if (result.success) {
    console.log('Custom SMS sent!');
  } else {
    console.error('Error sending SMS:', result.error);
  }
}

sendCustomSMS();
```

---

### 3️⃣ Sending OTP Code

```javascript
import { sendSMS } from 'textlk-nextjs';

async function sendOTP(phoneNumber, otp) {
  const result = await sendSMS({
    phoneNumber,
    message: `Your OTP code is: ${otp}`,
  });

  if (result.success) {
    console.log('OTP sent successfully!');
  } else {
    console.error('Failed to send OTP:', result.error);
  }
}

sendOTP('94710000000', '123456');
```

---

### 4️⃣ Sending Notification Messages

```javascript
import { sendSMS } from 'textlk-nextjs';

async function sendNotification() {
  const message = `Hello! Your order #1234 has been shipped. Track it here: https://tracking.example.com`;

  const result = await sendSMS({
    phoneNumber: '94710000000',
    message,
  });

  if (result.success) {
    console.log('Notification sent successfully!');
  } else {
    console.error('Failed to send notification:', result.error);
  }
}

sendNotification();
```

---

### 5️⃣ Handling Errors Gracefully

```javascript
import { sendSMS } from 'textlk-nextjs';

async function safeSendSMS() {
  try {
    const result = await sendSMS({
      phoneNumber: '94710000000',
      message: 'Testing error handling!',
    });

    if (!result.success) throw new Error(result.error);

    console.log('SMS sent!');
  } catch (err) {
    console.error('SMS could not be sent:', err.message);
  }
}

safeSendSMS();
```

---

## ⚡ Quick Start Copy-Paste

Create a file, for example `/pages/api/send-sms-quick.js`, or just use it in a script for testing:

```javascript
import { sendSMS } from 'textlk-nextjs';

// Example function to send SMS
export default async function sendExampleSMS() {
  try {
    // Simple SMS
    const simple = await sendSMS({
      phoneNumber: '94710000000',
      message: 'Hello from TextLK!',
    });
    console.log('Simple SMS:', simple);

    // Custom sender ID or API token
    const custom = await sendSMS({
      phoneNumber: '94710000000',
      message: 'Custom sender ID example!',
      senderId: 'CustomSender',
      apiToken: process.env.TEXTLK_API_TOKEN, // optional override
    });
    console.log('Custom SMS:', custom);

    // Sending OTP
    const otp = await sendSMS({
      phoneNumber: '94710000000',
      message: 'Your OTP code is: 123456',
    });
    console.log('OTP SMS:', otp);

    // Notification message
    const notification = await sendSMS({
      phoneNumber: '94710000000',
      message: 'Your order #1234 has been shipped. Track here: https://tracking.example.com',
    });
    console.log('Notification SMS:', notification);

  } catch (err) {
    console.error('SMS sending failed:', err.message);
  }
}

// Call the function immediately (for testing)
sendExampleSMS();
```

---

## 📌 Notes

* **Server-side only**: Never call `textlk-node` directly in the browser.
* Supports both **JavaScript** and **TypeScript**.
* Handles errors gracefully and returns JSON responses.
* Lightweight wrapper with no extra dependencies except `textlk-node`.

---

## 📝 License

MIT © Text.lk SMS Gateway Sri Lanka

---

This README is **ready for npm users**:

* Only imports from `textlk-nextjs`
* Shows client-side usage
* Includes optional overrides
* Provides multiple practical examples

---