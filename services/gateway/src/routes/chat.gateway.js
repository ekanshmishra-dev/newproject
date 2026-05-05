import express from 'express';
import { setupProxy } from '../utils/proxy.utils.js';
import services from '../config/services.config.js';
import { verifyJWT } from '../middleware/jwtVerify.middleware.js';

const router = express.Router();

/**
 * Chat Gateway Routes
 * 
 * PURPOSE: Routes WebSocket and HTTP requests to the Chat Service.
 */

// All chat routes are protected
router.use(verifyJWT);

// Proxy everything to Chat Service
router.all('*', setupProxy(services.chat.url));

export default router;
