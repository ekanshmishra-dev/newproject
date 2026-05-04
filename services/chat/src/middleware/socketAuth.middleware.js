import jwt from 'jsonwebtoken';
import { logger } from '@service-hub/common';

/**
 * Socket.IO Authentication Middleware
 * 
 * WHY: Verifies user identity before allowing a WebSocket connection.
 */
export const socketAuth = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    logger.warn('❌ Socket connection attempt failed: No token provided');
    return next(new Error('Authentication error: Token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    socket.user = decoded; // Attach user info to socket
    logger.info(`✅ User ${decoded.id} authenticated via WebSocket`);
    next();
  } catch (error) {
    logger.error('❌ Socket connection attempt failed: Invalid token');
    next(new Error('Authentication error: Invalid token'));
  }
};
