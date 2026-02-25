## About

Express backend boilerplate with lightweight routing and validation. This repository was originally scaffolded from express-generator-typescript and has been adapted to use Prisma as the data layer.

**Security note:** `helmet` is enabled by default in production. The demo had a flag to disable it; keep it enabled in real deployments.

---

## Getting started

1. Copy the example env into place:

```bash
cp config/.env.example config/.env.development
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database URL (example uses SQLite). In `config/.env.development` set:

```
DATABASE_URL="file:./dev.db"
```

4. Generate Prisma client and run migrations (development):

```bash
npm run prisma:generate
npm run prisma:migrate:dev
```

5. Start the dev server:

```bash
npm run dev
```

Open the API docs at: http://localhost:3000/api/docs

---

## Project scripts

- `npm run dev` — Start server in development mode (uses `ts-node`).
- `npm run dev:watch` — Restart on file changes.
- `npm run build` — Type-check and compile to `dist` for production.
- `npm start` — Run the production build.
- `npm run test` — Run unit tests with Vitest.
- `npm run prisma:generate` — Generate the Prisma client.
- `npm run prisma:migrate:dev` — Create and apply a dev migration.

---

## Prisma

This project uses Prisma as the ORM. A minimal schema is provided in `prisma/schema.prisma` with a `User` model. The runtime client wrapper is available at `src/repos/PrismaClient.ts`.

Notes:
- `@prisma/client` and `prisma` are already added to `package.json` — run `npm install` then `npm run prisma:generate`.
- In production you should replace the SQLite datasource with your production database and set `DATABASE_URL` accordingly.

---

If you'd like, I can:

- Remove the example `User` model from the Prisma schema.
- Replace the mock repository usage with Prisma queries across the codebase.
- Add database seed scripts.

Tell me which of those you'd like next.
---

## Current routes & services

- Root: `GET /` — basic health/root endpoint (returns "Hello World").
- Swagger UI: `GET /api/docs` — interactive OpenAPI UI (auto-served from `src/server.ts`).
- API base: `/api` — the API router is mounted at this path. Add routes in `src/routes/apiRouter.ts`.

Services and data layer:
- `src/repos/PrismaClient.ts` — Prisma client instance (use `@prisma/client` here for DB access).
- `src/repos/MockOrm.ts` — lightweight JSON-file mock DB used for local/demo purposes. Replace with Prisma queries when ready.

Where to add new endpoints:
- Create route handlers (e.g. `src/routes/MyEntityRoutes.ts`) and register them in `src/routes/apiRouter.ts` under the `/api` mount.
- Implement business logic in new service modules under `src/services/` and data access in `src/repos/` (use `PrismaClient` there).

Examples:
- `src/routes/apiRouter.ts` — add `const myRouter = Router()` and `apiRouter.use('/my-entity', myRouter)`.
- `src/repos/PrismaClient.ts` — import and use `prisma` like `await prisma.user.findMany()`.

---

If you want, I can:

- Convert existing mock repo usage (`MockOrm`) to use Prisma and add a `User` repository implementation.
- Add a short example route + service demonstrating Prisma queries.

Tell me which option you'd like next.
