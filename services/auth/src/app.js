import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorConverter, errorHandler } from '@service-hub/common';
import authRoutes from './routes/auth.routes.js';

/**
 * Express Application Configuration
 * 
 * PURPOSE: Sets up middleware and routes.
 * BEST PRACTICE: Uses Helmet for security headers and CORS for origin control.
 */

const app = express();

// Security Headers
app.use(helmet());

// Body Parser
app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: true,
}));

// Routes
app.use('/auth', authRoutes);

// Error Handling (Must be last)
app.use(errorConverter);
app.use(errorHandler);

export default app;
