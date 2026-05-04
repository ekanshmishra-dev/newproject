import dotenv from 'dotenv';
import app from './app.js';
import { initWorkers, closeWorkers } from './jobs/index.js';
import { connection as redisClient } from './config/redis.js';
import * as notificationService from './services/notification.service.js';
import { logger } from '@service-hub/common';

dotenv.config();

const PORT = process.env.PORT || 3003;
const isWorkerMode = process.argv.includes('--worker');

const startServer = async () => {
  try {
    if (isWorkerMode) {
      // 1. Worker Mode: Just process jobs
      initWorkers();
      logger.info('👷 Running in WORKER mode');
    } else {
      // 2. API Mode: Handle HTTP requests and Listen for Pub/Sub events
      app.listen(PORT, () => logger.info(`🚀 Notification API running on port ${PORT}`));

      // Subscribe to Chat Service events
      const subscriber = redisClient.duplicate();
      await subscriber.connect();
      
      await subscriber.subscribe('CHAT:NEW_MESSAGE', (message) => {
        try {
          const data = JSON.parse(message);
          logger.info(`🔔 Received Pub/Sub: New message in ${data.roomName}`);
          
          // Add job to queue for each recipient
          // Note: In real app, you'd fetch user emails from DB/Auth service
          data.recipients.forEach(userId => {
            notificationService.sendNewMessageNotification(
              'user@example.com', // Placeholder email
              'User', // Placeholder name
              data.senderName,
              data.roomName,
              data.content,
              data.roomId
            );
          });
        } catch (err) {
          logger.error('❌ Pub/Sub processing error:', err.message);
        }
      });
      
      logger.info('📡 Subscribed to CHAT:NEW_MESSAGE events');
    }
  } catch (error) {
    logger.error('❌ Failed to start Notification Service:', error);
    process.exit(1);
  }
};

const shutdown = async () => {
  logger.info('Shutting down...');
  await closeWorkers();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
