import winston from 'winston';

/**
 * Winston Logger Configuration
 * 
 * WHY: In production, we need structured logging (JSON) for easy parsing by
 * log management tools (like ELK, Datadog, or CloudWatch).
 * This logger handles different levels (info, error, warn) and adds
 * timestamps and service metadata.
 */

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: process.env.SERVICE_NAME || 'unknown-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
