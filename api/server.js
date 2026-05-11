import { server } from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    // Convert Node.js request to Fetch API request
    const url = `https://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
    });

    // Call the TanStack Start server
    const response = await server.fetch(request);

    // Convert Fetch API response to Node.js response
    res.status(response.status);
    for (const [key, value] of response.headers) {
      res.setHeader(key, value);
    }

    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Internal Server Error');
  }
}