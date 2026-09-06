# HRNet

React rewrite of the legacy jQuery HRNet application — internal HR tool for Wealth Health.

## Tech stack

- React 19 + Vite 8
- TypeScript (strict mode)
- Redux Toolkit
- React Router v7
- Tailwind CSS v4
- [`wh-react-datepicker`](../wh-react-datepicker) — local workspace package

## Getting started

```bash
pnpm install
pnpm dev
```

## Available scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run end-to-end tests (Playwright) |
| `pnpm lint` | Run ESLint |

## Lighthouse performance demo

**React app** — load 2000 employees via URL parameter:

```
http://localhost:5173/employees?seed=2000
```

The dataset is served from `public/employees-2000.json`. No console snippet needed.

**jQuery app** — see `../lighthouse-seed-jquery.txt` for the console snippet.
