import express from 'express';
import { setupProxy } from '../utils/proxy.utils.js';
import services from '../config/services.config.js';
import { verifyJWT } from '../middleware/jwtVerify.middleware.js';

const router = express.Router();

/**
 * Notification Gateway Routes
 * 
 * PURPOSE: Routes notification-related requests (e.g., getting notification history).
 */

// All notification routes are protected
router.use(verifyJWT);

// Proxy everything to Notification Service
router.all('*', setupProxy(services.notification.url));

export default router;
