import express from 'express';
import authGateway from './auth.gateway.js';
import chatGateway from './chat.gateway.js';
import notificationGateway from './notification.gateway.js';
import { ApiError } from '@service-hub/common';

const router = express.Router();

/**
 * Main Route Registry
 * 
 * PURPOSE: Mounts all service-specific gateways and defines global utility routes.
 */

// Health check for the Gateway itself
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'api-gateway',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Service Routes
router.use('/auth', authGateway);
router.use('/chat', chatGateway);
router.use('/notifications', notificationGateway);

// Handle 404
router.all('*', (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found on this gateway`));
});

export default router;
