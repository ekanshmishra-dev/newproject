import { body, validationResult } from 'express-validator';
import { ApiError } from '@service-hub/common';

/**
 * Input Validation Middleware
 * 
 * PURPOSE: Sanitizes and validates user input using express-validator.
 * STRUCTURE: Returns the first error found to keep responses clean.
 */

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    return next(new ApiError(400, firstError));
  }
  next();
};

export const validateRegister = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

export const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateRefresh = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
  handleValidationErrors,
];
