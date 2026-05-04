import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger, ApiError } from '@service-hub/common';

/**
 * Proxy Factory Utility
 * 
 * PURPOSE: Creates a configured proxy middleware for a specific service.
 * BEST PRACTICE: Custom error handling and logging for every forwarded request.
 */
export const setupProxy = (target, pathRewrite) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    proxyTimeout: 10000, // 10s
    onProxyReq: (proxyReq, req, res) => {
      // If we have a user from JWT, we can pass their ID to the backend service
      if (req.user) {
        proxyReq.setHeader('x-user-id', req.user.id);
      }
      logger.info(`[PROXY] Forwarding ${req.method} ${req.url} -> ${target}`);
    },
    onError: (err, req, res) => {
      logger.error(`[PROXY] Error forwarding to ${target}: ${err.message}`);
      // Return 503 Service Unavailable if backend is down
      res.status(503).json({
        code: 503,
        message: 'Service Temporarily Unavailable',
      });
    },
  });
};
