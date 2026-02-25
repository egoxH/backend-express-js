# backend-express-js

A modern Express.js backend boilerplate built with TypeScript, Prisma ORM, and comprehensive development tooling. This project provides a solid foundation for building scalable REST APIs with security best practices and automated testing.

## Features

- **TypeScript** — Type-safe development with full TypeScript support
- **Express.js** — Lightweight and flexible web framework
- **Prisma ORM** — Modern database access with type safety
- **Security** — Helmet.js enabled for HTTP header protection
- **API Documentation** — Swagger/OpenAPI UI available at `/api/docs`
- **Validation** — Request validation with jet-validators
- **Logging** — Request logging with Morgan and structured logging with Jet Logger
- **Testing** — Unit tests with Vitest
- **Code Quality** — ESLint for linting and Prettier for code formatting
- **Development** — Hot reload with nodemon and ts-node for development
- **Production Ready** — Compiled TypeScript builds for production deployment

## Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- A database (SQLite for development is configured by default)

## Quick Start

### 1. Clone and install dependencies

```bash
cd backend-express-js/backend
npm install
```

### 2. Set up environment variables

```bash
cp config/.env.example config/.env.development
```

Edit `config/.env.development` and set the database URL (example uses SQLite):

```
DATABASE_URL="file:./dev.db"
```

### 3. Initialize the database

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

### 4. Start the development server

```bash
npm run dev
```

The server will start on the configured port (default: 3000). Open http://localhost:3000/api/docs to view the API documentation.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with ts-node |
| `npm run dev:watch` | Start development server with auto-reload on file changes |
| `npm run build` | Type-check and compile TypeScript to JavaScript |
| `npm start` | Run the production build |
| `npm test` | Run unit tests with Vitest |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate:dev` | Create and apply database migrations |
| `npm run clean-install` | Clean install (removes node_modules and package-lock.json) |

## Project Structure

```
backend/
├── config/                 # Environment configuration
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── main.ts             # Application entry point
│   ├── server.ts           # Express server setup
│   ├── common/
│   │   ├── constants/      # App constants (env, HTTP status codes, paths)
│   │   └── utils/          # Utility functions (validators, error handling)
│   ├── models/             # TypeScript type definitions
│   ├── repos/              # Data access layer (Prisma, MockOrm)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   └── views/              # HTML templates or static files
├── tests/                  # Test files
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vitest.config.mts       # Vitest configuration
└── eslint.config.ts        # ESLint configuration
```

## Development Workflow

### Adding a New Route

1. Create a route handler file in `src/routes/` (e.g., `src/routes/UsersRoutes.ts`)
2. Define your Express router:

```typescript
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

export default usersRouter;
```

3. Register the route in `src/routes/apiRouter.ts`:

```typescript
import usersRouter from './UsersRoutes';

apiRouter.use('/users', usersRouter);
```

### Using Prisma

The Prisma client is available at `src/repos/PrismaClient.ts`. Use it in your services:

```typescript
import { prisma } from '@src/repos/PrismaClient';

export async function getUsers() {
  return await prisma.user.findMany();
}
```

### Writing Tests

Create test files in `tests/` with the `.test.ts` extension:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyService', () => {
  it('should perform an action', () => {
    expect(true).toBe(true);
  });
});
```

Run tests with: `npm test`

## Database

This project uses **Prisma** as the ORM. A minimal schema with a `User` model is provided in `prisma/schema.prisma`.

### Setting Up a New Database

1. Update `DATABASE_URL` in `config/.env.development`:

```
DATABASE_URL="file:./dev.db"                          # SQLite
DATABASE_URL="postgresql://user:password@localhost/db" # PostgreSQL
DATABASE_URL="mysql://user:password@localhost/db"      # MySQL
```

2. Generate the Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations:

```bash
npm run prisma:migrate:dev
```

## Security

- **Helmet.js** is enabled in production to set secure HTTP headers. Keep this enabled in production deployments.
- Request validation is performed using `jet-validators` before processing.
- Environment variables are managed via dotenv for sensitive configuration.

## API Documentation

The project includes Swagger/OpenAPI documentation. Access it at:

```
http://localhost:3000/api/docs
```

The spec is auto-generated in `src/server.ts`. Update endpoint documentation in your route handlers.

## Environment Configuration

Environment variables are loaded from files in the `config/` directory:

- `.env.development` — Development environment variables
- `.env.production` — Production environment variables
- `.env.example` — Template for environment variables

Key variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment (development, production, test) | development |
| `PORT` | Server port | 3000 |
| `DATABASE_URL` | Database connection string | file:./dev.db |

## Production Deployment

### Building for Production

```bash
npm run build
npm start
```

This compiles TypeScript to JavaScript in the `dist/` directory and runs it with Node.js.

### Environment Setup

Create `config/.env.production` with production values:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=your-production-database-url
```

### Docker (Optional)

To containerize the application, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

Build and run:

```bash
npm run build
docker build -t backend-express-js .
docker run -p 3000:3000 backend-express-js
```

## Troubleshooting

### Port Already in Use

Change the port in `config/.env.development`:

```
PORT=3001
```

### Prisma Client Not Generated

```bash
npm run prisma:generate
```

### Database Migration Issues

Reset the database:

```bash
npx prisma migrate reset
npm run prisma:migrate:dev
```

## Contributing

When adding new features:

1. Create a new branch for your feature
2. Follow the existing project structure
3. Run linting and tests before committing: `npm run lint && npm test`
4. Format code: `npm run format`
5. Type-check: `npm run type-check`

## License

See the [LICENSE](LICENSE) file for details.

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)