/**
 * Base API Error Class
 * 
 * WHY: We need a consistent structure for all errors across all services.
 * This ensures that when an error occurs, the response always includes
 * a status code, a message, and optional error details.
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
