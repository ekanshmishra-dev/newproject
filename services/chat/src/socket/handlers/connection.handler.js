import { logger } from '@service-hub/common';
import * as roomService from '../../services/room.service.js';

/**
 * Connection Handler
 * 
 * WHY: When a user connects, we want to automatically join them 
 * to all their rooms so they can receive real-time updates.
 */
export const onConnection = async (io, socket) => {
  const userId = socket.user.id;
  logger.info(`🔌 User ${userId} connected to socket ${socket.id}`);

  // Join user to all their chat rooms
  const rooms = await roomService.getRoomsByUser(userId);
  rooms.forEach(room => {
    socket.join(room._id.toString());
  });

  socket.emit('connected', { userId, socketId: socket.id });

  socket.on('disconnect', () => {
    logger.info(`🔌 User ${userId} disconnected`);
  });
};
