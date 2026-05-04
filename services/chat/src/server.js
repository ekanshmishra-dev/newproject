import dotenv from 'dotenv';
import { httpServer } from './app.js';
import connectDB, { disconnectDB } from './config/db.js';
import { connectRedis, disconnectRedis } from './config/redis.js';
import { logger } from '@service-hub/common';

dotenv.config();

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Chat Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start Chat Service:', error);
    process.exit(1);
  }
};

const shutdown = async () => {
  logger.info('Shutting down Chat Service...');
  httpServer.close(async () => {
    await disconnectDB();
    await disconnectRedis();
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();
