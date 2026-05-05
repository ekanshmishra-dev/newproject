import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { errorConverter, errorHandler } from '@service-hub/common';
import { requestLogger } from './middleware/requestLogger.middleware.js';
import { globalLimiter } from './middleware/rateLimiter.middleware.js';
import routes from './routes/index.js';

/**
 * Gateway Express App
 */

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors());

// Global Rate Limiting
app.use(globalLimiter);

// Parse JSON body (Only needed for routes handled BY the gateway, like /health if it were POST)
// REMOVED: app.use(express.json()); // This breaks proxying of POST requests

// Log every request hitting the gateway
app.use(requestLogger);

// Mount All Routes
app.use('/', routes);

// Error Handling
app.use(errorConverter);
app.use(errorHandler);

export default app;
