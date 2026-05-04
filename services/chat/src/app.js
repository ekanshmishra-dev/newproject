import express from 'express';
import { createServer } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import { errorConverter, errorHandler } from '@service-hub/common';
import chatRoutes from './routes/chat.routes.js';
import { initSocket } from './socket/index.js';

const app = express();
const httpServer = createServer(app);

// Security
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoutes);

// Socket.IO
const io = initSocket(httpServer);

// Error Handling
app.use(errorConverter);
app.use(errorHandler);

export { app, httpServer, io };
