# Educado POC - Full Stack Development Environment

A modern full-stack application built with Express.js, Strapi CMS, and React, all containerized with Docker for development and production deployment.

## Architecture Overview

This project follows a microservices architecture with three main components:

- **Frontend**: React/TypeScript application with Vite build system
- **Backend**: Express.js API server with TypeScript for business logic and authentication
- **MongoDB**: Database for user content
- **Strapi CMS**: Headless CMS for content management (courses, media, etc.)
- **PostgreSQL**: Database for Strapi content storage

### Technology Stack

- **Frontend**: React 18, TypeScript, Vite, TanStack (Router, Query, Table, Forms)
- **Backend**: Express.js 5, MongoDB, TypeScript, auto-generated Strapi API client
- **CMS**: Strapi 5.23.5 with PostgreSQL 16
- **Infrastructure**: Docker Compose, pnpm workspaces
- **API Integration**: OpenAPI code generation for type-safe Strapi integration

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 22+ and pnpm
  - While there are newer versions of Node, version 22 is the newest LTS (Long-Term Support) version.
- Git

### 1. Clone and Setup
\`\`\`bash
git clone <repository>
cd Educado-POC
cp .env.example .env  # Configure your environment variables
\`\`\`

### 2. Start the Full Stack
\`\`\`bash
# Start all services with Docker
docker compose up --build

# Or start individually:
docker compose up --build -d strapi-db  # Database first
docker compose up --build -d strapi     # Strapi CMS
docker compose up --build backend       # Express.js API
docker compose up --build frontend      # React app
\`\`\`

### 3. Initial Strapi Setup
1. Visit http://localhost:1337/admin
2. Create your admin user
3. Generate an API token with full permissions
4. Add the token to your \`.env\` file as \`STRAPI_API_TOKEN\`

### 4. Access Applications
- **Frontend**: http://localhost:3000 (React app)
- **Backend API**: http://localhost:8080 (Express.js)
- **Strapi Admin**: http://localhost:1337/admin (CMS)
- **Strapi API**: http://localhost:1337/api (REST API)

## Development Workflow

### Content Management with Strapi
Strapi serves as the headless CMS, providing a REST API for content management. Content types include courses, sections, media assets, and more.

**Example: Managing Courses**
1. Access Strapi admin at http://localhost:1337/admin
2. Create/edit course content types
3. Add course data through the admin interface
4. Content is automatically available via REST API at \`/api/courses\`

### Type-Safe API Integration

The backend uses an automatically generated TypeScript client to communicate with Strapi's API, ensuring type safety and reducing development errors.

#### Generated Client Structure
\`\`\`
backend/src/shared/api/strapi/
├── services/          # API service classes (CourseService, etc.)
├── models/           # TypeScript interfaces for data models
├── core/             # HTTP client infrastructure
└── index.ts          # Main exports
\`\`\`

#### Using the Strapi Client (Example with Courses)
\`\`\`typescript
import { OpenAPI, CourseService } from '../shared/api/strapi';

// Configure the client
OpenAPI.BASE = process.env.STRAPI_URL;
OpenAPI.TOKEN = process.env.STRAPI_API_TOKEN;

// Fetch all courses with full type safety
const courses = await CourseService.courseGetCourses();

// Get specific course
const course = await CourseService.courseGetCoursesById({ id: 1 });
\`\`\`

### API Regeneration Workflow

When Strapi content types change, regenerate the TypeScript client:

\`\`\`bash
# 1. Regenerate OpenAPI specification from Strapi
cd strapi
pnpm generate-spec

# 2. Regenerate TypeScript client in backend
cd ../backend
pnpm generate-strapi-client

# 3. Restart backend to use new types
docker compose restart backend
\`\`\`

**Important**: Always regenerate after:
- Adding/modifying Strapi content types
- Changing field structures
- Updating API permissions

## Environment Configuration

The project uses a dual environment file strategy:

### \`.env\` (Base Configuration)
- Default values for local development
- Uses \`localhost\` for service connections
- Contains all environment variables

### \`.env.docker\` (Docker Overrides)
- Extends \`.env\` with Docker-specific values
- Only overrides necessary values (service hostnames, NODE_ENV)
- Used automatically by \`docker compose up\`

### Key Environment Variables
\`\`\`bash
# Database
POSTGRES_DB=educado
POSTGRES_USER=educado
POSTGRES_PASSWORD=your_password

# Strapi
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_token

# Backend API
BACKEND_PORT=8000
NODE_ENV=development
\`\`\`

## Development Modes

### Docker Development (Recommended)
\`\`\`bash
docker compose up --build
\`\`\`
- All services containerized
- Automatic rebuilds on code changes
- Production-like environment
- Easy service isolation and debugging

### Local Development (Backend/Frontend)
\`\`\`bash
# Keep Strapi and database in Docker
docker compose up -d strapi strapi-db

# Run backend locally
cd backend
pnpm dev

# Run frontend locally
cd frontend
pnpm dev
\`\`\`
- Faster iteration for backend/frontend development
- Direct debugging and hot reload
- Still uses containerized Strapi for consistency

### Strapi Development
\`\`\`bash
# For Strapi plugin/schema development
docker compose up -d strapi-db
cd strapi
pnpm dev
\`\`\`
- Direct access to Strapi's development server
- Schema changes and plugin development
- Real-time admin interface updates

## Project Structure

\`\`\`
Educado-POC/
├── backend/              # Express.js API server
│   ├── src/
│   │   ├── routes/       # API route definitions
│   │   ├── middleware/   # Express middleware
│   │   └── shared/
│   │       └── api/
│   │           └── strapi/  # Generated TypeScript client
│   └── Dockerfile
├── frontend/             # React application
│   ├── src/
│   │   ├── features/     # Feature-based architecture
│   │   ├── shared/       # Shared components and utilities
│   │   └── routes/       # TanStack Router configuration
│   └── Dockerfile
├── strapi/               # Strapi CMS
│   ├── src/api/          # Content type definitions
│   ├── config/           # Strapi configuration
│   └── Dockerfile
├── openapi/              # Generated OpenAPI specifications
├── docker-compose.yaml   # Service orchestration
├── .env                  # Base environment configuration
└── .env.docker          # Docker-specific overrides
\`\`\`

## API Integration Example

Here's a complete example of how the backend integrates with Strapi to serve course data:

\`\`\`typescript
// backend/src/routes/courses.ts
import express from 'express';
import { OpenAPI, CourseService } from '../shared/api/strapi';

const router = express.Router();

// GET /api/courses - List all courses
router.get('/', async (req, res) => {
  try {
    const courses = await CourseService.courseGetCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/courses/:id - Get specific course
router.get('/:id', async (req, res) => {
  try {
    const course = await CourseService.courseGetCoursesById({ 
      id: parseInt(req.params.id) 
    });
    res.json(course);
  } catch (error) {
    res.status(404).json({ error: 'Course not found' });
  }
});

export default router;
\`\`\`

## Production Deployment

### Docker Production Build
\`\`\`bash
# Build production images
docker compose -f docker-compose.yaml build

# Start in production mode
NODE_ENV=production docker compose up -d
\`\`\`

### Environment Setup for Production
1. Update \`.env\` with production values
2. Generate strong passwords and API tokens
3. Configure external PostgreSQL if needed
4. Set up reverse proxy (nginx) for domain routing
5. Configure SSL certificates

## Troubleshooting

### Common Issues

**Strapi Connection Issues**
- Ensure PostgreSQL container is running first
- Check API token permissions in Strapi admin
- Verify STRAPI_URL matches container networking

**Client Generation Fails**
- Ensure Strapi is running and accessible
- Stop Strapi dev mode before generating specs
- Check OpenAPI specification exists in \`/openapi/strapi-spec.json\`

**Docker Volume Issues**
\`\`\`bash
# Reset Docker volumes if needed
docker compose down -v
docker compose up --build
\`\`\`

### Logs and Debugging
\`\`\`bash
# View service logs
docker compose logs backend
docker compose logs strapi
docker compose logs frontend

# Follow logs in real-time
docker compose logs -f backend
\`\`\`

## Contributing

1. Make changes to your respective service (backend/frontend/strapi)
2. Test locally with \`docker compose up --build\`
3. Regenerate API clients if Strapi schemas changed
4. Commit both source changes and generated files
5. Submit pull request with clear description of changes

---

This development environment provides a robust foundation for building modern web applications with content management capabilities, type-safe API integration, and containerized deployment.