import logger from '../utils/logger.js';

/**
 * Global Error Handler Middleware
 * 
 * WHY: This is the last line of defense. Any error thrown in the app 
 * eventually ends up here. It prevents the server from crashing and
 * ensures the client receives a proper JSON error message instead of 
 * a HTML stack trace (which is a security risk).
 */
export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new Error(message);
    error.statusCode = statusCode;
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode || 500,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode || 500).send(response);
};
