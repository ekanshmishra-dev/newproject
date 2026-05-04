import { logger } from '@service-hub/common';
import * as emailService from '../../services/email.service.js';

/**
 * Email Job Processor
 * 
 * PURPOSE: Logic to process a single email job from the queue.
 */
export default async (job) => {
  const { to, subject, template, data } = job.data;
  
  try {
    logger.info(`📧 Processing email job ${job.id} for ${to}`);
    
    // 1. Load and compile template
    const html = await emailService.loadTemplate(template, data);
    
    // 2. Send email
    await emailService.sendEmail(to, subject, html);
    
    return { status: 'success' };
  } catch (error) {
    logger.error(`❌ Email processing failed for job ${job.id}: ${error.message}`);
    throw error; // Re-throw to allow BullMQ to retry
  }
};
