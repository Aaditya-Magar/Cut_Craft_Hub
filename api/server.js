import server from '../dist/server/server.js';

export default async function handler(req, res) {
  const host = req.headers.host || 'localhost';
  const forwardedUrl =
    req.headers['x-now-original-url'] ||
    req.headers['x-vercel-original-url'] ||
    req.headers['x-original-url'] ||
    req.url ||
    '/';
  const url = new URL(forwardedUrl, `https://${host}`);
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') {
      headers.append(key, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        headers.append(key, v);
      }
    }
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
  });

  const response = await server.fetch(request);

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  const body = await response.text();
  res.send(body);
}
