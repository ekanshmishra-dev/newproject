import { logger } from '@service-hub/common';

/**
 * Request Logger Middleware
 * 
 * PURPOSE: Logs every incoming request for auditing and debugging.
 * BEST PRACTICE: Captures response time to identify slow service endpoints.
 */
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const userId = req.user ? req.user.id : 'anonymous';
    
    logger.info(`[GATEWAY] ${method} ${url} | ${res.statusCode} | ${duration}ms | IP: ${ip} | User: ${userId}`);
  });

  next();
};
