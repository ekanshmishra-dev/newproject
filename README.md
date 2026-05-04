# 🚀 Service Hub - Microservices Portfolio

A production-grade microservices backend built with Node.js, Express, MongoDB, Redis, and Docker.

## 🛠️ Features
- **Auth Service**: JWT-based authentication with token rotation.
- **Gateway**: Single entry point with rate limiting and proxying.
- **Chat Service**: Real-time communication via Socket.IO and Redis Pub/Sub.
- **Notification Service**: Async email processing using BullMQ.
- **Dockerized**: Entire stack orchestrates with `docker-compose`.
- **CI/CD**: Fully automated testing and deployment via GitHub Actions.

## 🚀 Deployment

### Automatic Deployment (CI/CD)
1. Push to `main` branch
2. GitHub Actions automatically:
   - Runs tests & linting
   - Builds multi-stage Docker images
   - Pushes to GitHub Container Registry (GHCR)
   - Deploys to Railway/Fly.io

### Manual Deployment

**Using Railway:**
```bash
railway up
```

**Using Docker:**
```bash
npm run docker:up
```

### Environment Variables
Set these in your deployment platform (e.g., Railway/Fly.io dashboard):
- `MONGODB_URI`: Connection string for MongoDB.
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`: Redis connection details.
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`: Secure keys for token signing.
- `SMTP_USER`, `SMTP_PASS`: Credentials for your email provider.

## 📦 Project Structure
- `/packages/common`: Shared utilities (logger, errors, env validation).
- `/services/auth`: Authentication and user management.
- `/services/gateway`: API Gateway and proxy.
- `/services/chat`: Real-time messaging logic.
- `/services/notification`: Background job processing.
