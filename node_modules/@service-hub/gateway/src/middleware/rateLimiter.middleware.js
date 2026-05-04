import rateLimit from 'express-rate-limit';
import { ApiError } from '@service-hub/common';

/**
 * Rate Limiter Middleware
 * 
 * PURPOSE: Prevents DoS attacks and brute forcing.
 * BEST PRACTICE: Use different limits for different types of routes.
 */

export const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many requests, please try again later'));
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Strict limit for login/register
  handler: (req, res, next) => {
    next(new ApiError(429, 'Too many login attempts, please try again in 15 minutes'));
  },
});
