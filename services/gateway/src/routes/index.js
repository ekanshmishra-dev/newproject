import express from 'express';
import authGateway from './auth.gateway.js';
import chatGateway from './chat.gateway.js';
import notificationGateway from './notification.gateway.js';
import { ApiError } from '@service-hub/common';

const router = express.Router();

/**
 * Main Route Registry
 * 
 * PURPOSE: Mounts all service-specific gateways and defines global utility routes.
 */

// Health check for the Gateway itself
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'api-gateway',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root Route - Futuristic Dashboard for HR/CEO
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Service Hub | Microservices Ecosystem</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg: #0b0a15;
                --surface: rgba(255, 255, 255, 0.03);
                --border: rgba(255, 255, 255, 0.08);
                --primary: #8a2be2;
                --secondary: #ff007f;
                --text: #e2e1e7;
                --green: #00ffaa;
            }
            body {
                margin: 0;
                padding: 0;
                background-color: var(--bg);
                color: var(--text);
                font-family: 'Outfit', sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                overflow-y: auto;
                padding: 2rem 0;
            }
            .grid-bg {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background-image: linear-gradient(rgba(138, 43, 226, 0.05) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(138, 43, 226, 0.05) 1px, transparent 1px);
                background-size: 30px 30px;
                z-index: 0;
                pointer-events: none;
            }
            .glow {
                position: absolute;
                width: 500px;
                height: 500px;
                background: radial-gradient(circle, rgba(255, 0, 127, 0.1) 0%, rgba(138, 43, 226, 0.05) 50%, transparent 70%);
                top: 20%;
                left: 70%;
                z-index: 0;
                pointer-events: none;
            }
            .container {
                position: relative;
                z-index: 1;
                background: var(--surface);
                backdrop-filter: blur(12px);
                border: 1px solid var(--border);
                border-radius: 20px;
                padding: 3rem;
                width: 90%;
                max-width: 700px;
                box-shadow: 0 30px 60px rgba(0,0,0,0.4);
                margin: auto;
            }
            header {
                text-align: center;
                margin-bottom: 2.5rem;
            }
            h1 {
                font-size: 3.5rem;
                font-weight: 700;
                margin: 0;
                background: linear-gradient(135deg, #fff 30%, var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -1px;
            }
            .tagline {
                color: #7b7993;
                font-size: 1.1rem;
                margin-top: 0.5rem;
            }
            .services-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                margin-bottom: 2.5rem;
            }
            .service-card {
                background: rgba(255, 255, 255, 0.01);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                transition: all 0.3s ease;
            }
            .service-card:hover {
                background: rgba(255, 255, 255, 0.03);
                border-color: var(--primary);
                transform: translateY(-3px);
            }
            .service-name {
                font-weight: 700;
                font-size: 1.2rem;
                color: #fff;
            }
            .service-status {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: #7b7993;
            }
            .status-dot {
                width: 8px;
                height: 8px;
                background: var(--green);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--green);
            }
            .tech-stack {
                text-align: left;
                margin-bottom: 2.5rem;
            }
            .tech-stack h3 {
                font-size: 1.2rem;
                color: #fff;
                margin-bottom: 1rem;
                position: relative;
                display: inline-block;
            }
            .tech-stack h3::after {
                content: '';
                position: absolute;
                bottom: -5px; left: 0;
                width: 40px; height: 2px;
                background: var(--secondary);
            }
            .tech-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            .tech-tag {
                background: rgba(138, 43, 226, 0.1);
                border: 1px solid rgba(138, 43, 226, 0.2);
                color: #bfa0ff;
                padding: 0.4rem 0.8rem;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 500;
            }
            .endpoints {
                text-align: left;
                background: rgba(0, 0, 0, 0.2);
                padding: 1.5rem;
                border-radius: 12px;
                border: 1px solid var(--border);
            }
            .endpoints h3 {
                margin-top: 0;
                color: #fff;
                margin-bottom: 1rem;
            }
            .endpoint-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 0.75rem;
                font-family: monospace;
                font-size: 0.9rem;
            }
            .method {
                font-weight: bold;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                width: 45px;
                text-align: center;
            }
            .method.get { background: rgba(0, 255, 170, 0.1); color: var(--green); }
            .method.post { background: rgba(255, 0, 127, 0.1); color: var(--secondary); }
            .method.ws { background: rgba(138, 43, 226, 0.2); color: #fff; }
            
            .btn {
                display: block;
                text-align: center;
                margin-top: 2rem;
                padding: 0.75rem;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: #fff;
                border-radius: 8px;
                text-decoration: none;
                font-weight: 700;
                transition: all 0.3s ease;
                box-shadow: 0 10px 20px rgba(255, 0, 127, 0.15);
            }
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(255, 0, 127, 0.25);
                opacity: 0.9;
            }
            .footer {
                text-align: center;
                margin-top: 2rem;
                font-size: 0.8rem;
                color: #4c4a63;
            }
        </style>
    </head>
    <body>
        <div class="grid-bg"></div>
        <div class="glow"></div>
        <div class="container">
            <header>
                <h1>SERVICE HUB</h1>
                <div class="tagline">Enterprise Microservices Ecosystem</div>
            </header>

            <div class="services-grid">
                <div class="service-card">
                    <div class="service-name">Gateway Service</div>
                    <div class="service-status"><div class="status-dot"></div> Routing & Security Active</div>
                </div>
                <div class="service-card">
                    <div class="service-name">Auth Service</div>
                    <div class="service-status"><div class="status-dot"></div> User Management Active</div>
                </div>
                <div class="service-card">
                    <div class="service-name">Chat Service</div>
                    <div class="service-status"><div class="status-dot"></div> WebSocket Server Active</div>
                </div>
                <div class="service-card">
                    <div class="service-name">Notification Service</div>
                    <div class="service-status"><div class="status-dot"></div> Event Processor Active</div>
                </div>
            </div>

            <div class="tech-stack">
                <h3>Core Technologies</h3>
                <div class="tech-list">
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">Express</span>
                    <span class="tech-tag">Redis Pub/Sub</span>
                    <span class="tech-tag">MongoDB</span>
                    <span class="tech-tag">WebSockets</span>
                    <span class="tech-tag">Docker</span>
                </div>
            </div>

            <div class="endpoints">
                <h3>Exposed API Gateway Endpoints</h3>
                <div class="endpoint-item">
                    <span class="method get">GET</span>
                    <span>/health</span>
                    <span style="color: #7b7993"> - Gateway Health</span>
                </div>
                <div class="endpoint-item">
                    <span class="method post">POST</span>
                    <span>/auth/register</span>
                    <span style="color: #7b7993"> - User Registration</span>
                </div>
                <div class="endpoint-item">
                    <span class="method post">POST</span>
                    <span>/auth/login</span>
                    <span style="color: #7b7993"> - User Authentication</span>
                </div>
                <div class="endpoint-item">
                    <span class="method ws">WS</span>
                    <span>/chat</span>
                    <span style="color: #7b7993"> - Real-time Messaging</span>
                </div>
            </div>

            <a href="/health" class="btn">Examine Gateway Health</a>

            <div class="footer">
                Developed by Ekansh Mishra | For Evaluation Only
            </div>
        </div>
    </body>
    </html>
  `);
});

// Service Routes
router.use('/auth', authGateway);
router.use('/chat', chatGateway);
router.use('/notifications', notificationGateway);

// Handle 404
router.all('*', (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found on this gateway`));
});

export default router;
