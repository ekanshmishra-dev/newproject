import IORedis from 'ioredis';
import { logger } from '@service-hub/common';


const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, 
};

export const connection = new IORedis(redisConfig);

connection.on('error', (err) => logger.error('❌ Notification Redis Error:', err));
connection.on('connect', () => logger.info('✅ Notification Redis Connected'));
