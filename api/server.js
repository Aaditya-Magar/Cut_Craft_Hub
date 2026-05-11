import { createRequestHandler } from '@tanstack/react-start/server-entry';
import { getRouter } from '../src/router.js';

export default createRequestHandler({
  createRouter: () => getRouter(),
});