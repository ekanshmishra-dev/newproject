/**
 * Service Configuration Registry
 * 
 * PURPOSE: Maps service names to their respective URLs.
 * WHY: Centralizing this makes it easy to update service locations 
 * when moving from local development to production.
 */

const services = {
  auth: {
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    timeout: 10000, // 10 seconds
  },
  chat: {
    url: process.env.CHAT_SERVICE_URL || 'http://localhost:3002',
    timeout: 30000, // Chat might need longer for history loads
  },
  notification: {
    url: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3003',
    timeout: 5000,
  }
};

export default services;
