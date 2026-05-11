import { createRequestHandler } from '@tanstack/react-start/server';
import { getRouter } from '../src/router.js';

const handler = createRequestHandler({
  createRouter: () => getRouter(),
});

export default async function(req, res) {
  return handler(req, res);
}