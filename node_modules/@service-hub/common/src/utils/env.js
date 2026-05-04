import { z } from 'zod';
import logger from './logger.js';

/**
 * Environment Variable Validator
 * 
 * WHY: We use Zod to validate that all required environment variables are present
 * and have the correct format (e.g., PORT must be a number).
 * Failing to start if a config is missing is a production best practice.
 */
export const validateEnv = (schema) => {
  try {
    return schema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join('.')).join(', ');
      logger.error(`❌ Invalid environment variables: ${missingVars}`);
      process.exit(1); // Exit with failure
    }
    throw error;
  }
};
