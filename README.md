# Finance SaaS

A modern, scalable SaaS platform for personal and business finance management.

## Tech Stack

### Backend
- NestJS 10+
- TypeScript 5+
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js 15 (App Router)
- TypeScript 5+
- Tailwind CSS
- shadcn/ui
- React Query

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm >= 8
- PostgreSQL

### Installation

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Push database schema
pnpm db:push

# Start development servers
pnpm dev
```

### Development

- Backend API: http://localhost:3001
- Frontend: http://localhost:3000

## Project Structure

```
finance-saas/
├── apps/
│   ├── api/              # NestJS backend
│   └── web/              # Next.js frontend
├── packages/
│   ├── ui/               # Shared UI components
│   ├── config/           # Shared config
│   ├── types/            # Shared TypeScript types
│   ├── utils/            # Shared utilities
│   └── validation/       # Shared validation schemas
└── docs/                 # Documentation
```

## Documentation

- [Product Requirements Document](docs/PRD.md)
- [Technical Architecture](docs/ARCHITECTURE.md)

## License

MIT
