# User Profile Manager — Monorepo (API + Web)

This is the **full monorepo** with:
- `apps/api`: GraphQL API (Node + TypeScript)
- `apps/web`: React + TypeScript client
- Logout + true multi-login (each email has its own user), clean CSS (no libraries)

## Quick Start (recommended with pnpm)
```bash
npm i -g pnpm
pnpm i

# Terminal A
pnpm -C apps/api dev

# Terminal B
pnpm -C apps/web dev
```
- API → http://localhost:4000/graphql
- Web → http://localhost:5173

## If you prefer npm (no pnpm)
```bash
# API
cd apps/api
npm install
npm run dev

# Web
cd ../web
npm install
npm run dev
```

## Features
- Login by email → JWT issued
- `me`, `updateProfile(name)`; email is read-only on profile
- Logout clears token and Apollo cache
- GitHub repos listing with 60s server-side cache
- Helmet + rate limiting + CORS (dev origin from `.env`)
- Plain CSS styling (`apps/web/src/styles.css`)

## Architecture 
This project follows a modular monorepo architecture with a clean separation between the API layer and the Web client, while sharing common environment and dependency management. The core principles behind the architecture are clarity, scalability, loose coupling, and developer efficiency.
- Monorepo Using pnpm Workspaces
- API Architecture: GraphQL
- Stateless Authentication Using JWT
- In-Memory User Storage with Email Indexing
- Client Built with React + Apollo Client
- Vite for Frontend Build and Dev Server# User-Profile-Manager
