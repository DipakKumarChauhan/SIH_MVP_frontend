# SIH Frontend Project

A full-stack React + Express application template, built for rapid development and production readiness. This project uses modern tooling and best practices for scalable web apps.

---

## Tech Stack

- **Frontend:** React 18, React Router 6, TypeScript, Vite, TailwindCSS 3, Radix UI, Lucide React icons
- **Backend:** Express server (integrated with Vite dev server)
- **Testing:** Vitest
- **Package Manager:** PNPM (preferred)
- **Shared Types:** TypeScript interfaces in `shared/`

---

## Project Structure

```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI component library
├── App.tsx               # SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

server/                   # Express API backend
├── index.ts              # Main server setup (express config + routes)
└── routes/               # API handlers

shared/                   # Types used by both client & server
└── api.ts                # Example shared api interfaces
```

---

## Key Features

- **SPA Routing:** Powered by React Router 6, routes in `client/pages/`, setup in `client/App.tsx`
- **Styling:** TailwindCSS 3, theme tokens in `client/global.css`, UI library in `client/components/ui/`
- **Express Integration:** Single port dev server, hot reload, API endpoints prefixed with `/api/`
- **Type Safety:** Shared interfaces via `shared/`, path aliases (`@shared/*`, `@/*`)
- **Testing:** Vitest for unit tests

---

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test       # Run Vitest tests
```

---

## Adding Features

### New API Route

1. (Optional) Add shared interface in `shared/api.ts`
2. Create handler in `server/routes/`
3. Register route in `server/index.ts`
4. Use in React components with type safety

### New Page Route

1. Create component in `client/pages/`
2. Add route in `client/App.tsx`

### Add Colors

Edit `client/global.css` and `tailwind.config.ts` for new theme colors.

---

## Production Deployment

- Build: `pnpm build`
- Deploy: Netlify, Vercel, or self-hosted (see AGENTS.md for details)

---

## Notes

- Prefer PNPM for all package management
- Use Express endpoints only for server-side logic (e.g., DB, secrets)
- TypeScript throughout (client, server, shared)
- Hot reload for rapid development

---

For more details, see [AGENTS.md](./AGENTS.md).