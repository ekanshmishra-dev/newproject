# Service Hub - Project Guide

## Phase 1: Foundation (Completed)

We have successfully set up the structural foundation of our microservices architecture.

### 1. Monorepo with npm Workspaces
- **What**: We used `npm workspaces` in the root `package.json`.
- **Why**: This allows us to manage all microservices in one repository while keeping them logically separated. We can run commands across all services at once (e.g., `npm run dev` in all folders) and share local packages like `@service-hub/common`.
- **Production Practice**: Large-scale companies like Google and Meta use monorepos to ensure consistency across services and simplify dependency management.

### 2. Common Shared Package (`@service-hub/common`)
- **What**: A dedicated package for utilities used by all services.
- **Why**: 
    - **DRY (Don't Repeat Yourself)**: We don't want to rewrite the error handler or logger 5 times for 5 services.
    - **Consistency**: All services should log in the same format and return errors in the same JSON structure.
- **Key Components**:
    - **Logger (Winston)**: Configured for structured JSON logging.
    - **ApiError**: A standardized class for all API-related errors.
    - **Error Middleware**: A global catcher that prevents server crashes and hides internal details from clients.
    - **Env Validator (Zod)**: Ensures the app doesn't start if the configuration is broken.

### 3. Folder Structure
- `/services`: Will contain our independent microservices (Auth, Chat, etc.).
- `/packages`: Contains shared code like our `common` library.
- `.env.example`: Centralized template for environment variables.

---

## Next Steps: Phase 2 - Auth Service
We will now build the identity provider of our system. This service will handle user registration, secure login with JWT (Access + Refresh tokens), and session management using Redis.
