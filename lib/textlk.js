/**
 * Client-side helper to call the server API
 * @param {Object} param0
 * @param {string} param0.phoneNumber - Recipient phone number
 * @param {string} param0.message - SMS message
 * @param {string} [param0.senderId] - Optional sender ID override
 * @param {string} [param0.apiToken] - Optional API token override
 * @returns {Promise<Object>} - Response from API
 */
export async function sendSMS({ phoneNumber, message, senderId, apiToken }) {
  if (!phoneNumber || !message) throw new Error('phoneNumber and message are required');

  const response = await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, message, senderId, apiToken })
  });

  return await response.json();
}
