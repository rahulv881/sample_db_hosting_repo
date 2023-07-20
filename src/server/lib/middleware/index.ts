import { findIp } from './find-ip';
import { CorsMiddleware } from './cors';
import { requestId } from './request-id';
import { ReapUpload } from './reap-upload';
import { cacheControl } from './cache-control';
import { errorHandler } from './error-handler';
import { logRequest } from './log-request';

import { secureHeaders } from './secure-headers';

/**
 * Export all middlewares via middleware object
 */
export const middlewares = {
  findIp,
  requestId,
  logRequest,
  cacheControl,
  errorHandler,
  secureHeaders,
  reapUpload: ReapUpload,
  cors: CorsMiddleware.createCorsMiddleware
};
