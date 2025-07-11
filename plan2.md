# Sonari Full Build Plan

## 1. Project Structure & Tooling

- **Monorepo**: Use Turborepo, Nx, or Yarn workspaces for unified management.
- **Packages/Apps**:
  - `/web` – React (Next.js or Vite) + Tailwind CSS + TypeScript
  - `/mobile` – React Native (Expo + EAS) + TypeScript
  - `/backend` – Node.js + Express + PostgreSQL + TypeScript
  - `/shared` – Shared types, API clients, validation schemas
- **CI/CD**: Vercel (web), Expo EAS (mobile), Render/DigitalOcean (backend)
- **Testing**: Jest, React Testing Library, Cypress (web), Detox (mobile)
- **Linting/Formatting**: ESLint, Prettier, Stylelint
- **Env Management**: `.env` files per app, never commit secrets

---

## 2. Scaffolding & Navigation

### Web
- All screens as React components in `/web/src/pages` (Next.js) or `/web/src/pages` + React Router (Vite)
- Centralized layout, navigation, and role-based route guards
- Responsive, accessible UI with Tailwind

### Mobile
- All screens as React Native components in `/mobile/src/screens`
- Navigation via React Navigation (stack, tab, drawer as needed)
- Role-based access and navigation guards

### Shared
- `/shared/types` for TypeScript interfaces (User, Song, Playlist, etc.)
- `/shared/api` for API clients (OpenAPI/Swagger recommended)
- `/shared/utils` for validation, formatting, analytics hooks

---

## 3. Screen Scaffolding (All Platforms)
- Create all screens from the plan (see plan.md breakdown)
- Each screen includes:
  - Title/header
  - Placeholder for main content
  - Navigation buttons (where relevant)
  - TODO comments for logic, API integration, and UI polish
- Implement navigation and role-based access for all screens

---

## 4. Iterative Feature Development

### Prioritization Order
1. **Onboarding & Auth** (Splash, Role Select, Signup, Login, Email Verification, Forgot Password)
2. **Core Listener Flows** (Home, Search, Library, Now Playing, Playlist, Artist Profile)
3. **Core Artist Flows** (Upload, Dashboard, Content Library, Analytics)
4. **Wallet, Coins, Subscriptions** (Stripe integration, coin purchase, premium plans)
5. **Admin Panel** (Web only)
6. **Settings, Notifications, Family Profiles, Policies, 404, Update Screen)
7. **Popups, Drawers, Modals** (as overlays/components)

### For Each Screen:
- Implement UI (responsive, accessible)
- Add business logic, forms, validation
- Integrate with backend APIs
- Add error boundaries, loading states, analytics events
- Write unit/integration tests

---

## 5. Backend Implementation
- **Node.js + Express + TypeScript**
- **PostgreSQL** with migrations (Knex, Prisma, or Sequelize)
- **JWT Auth** (role-based, email verification, password reset)
- **AWS S3** for media uploads
- **Stripe** for payments, subscriptions, coins
- **Analytics**: PostHog or Plausible
- **Admin APIs**: Promotions, feature flags, notifications
- **Testing**: Jest, Supertest
- **Monitoring**: Sentry, logging

---

## 6. Best Practices
- TypeScript everywhere
- Centralized error handling and boundaries
- Analytics hooks for all major actions
- Responsive and accessible UI
- Secure secrets in `.env`
- Automated tests and CI/CD
- Code reviews and PRs for all features

---

## 7. Milestones & Phases

### Phase 1: Project Setup & Scaffolding
- Monorepo, tooling, all screen stubs, navigation, shared types

### Phase 2: Auth & Onboarding
- Full flows for signup, login, email verification, password reset

### Phase 3: Listener Core
- Home, Search, Library, Now Playing, Playlist, Artist Profile

### Phase 4: Artist Core
- Upload, Dashboard, Content Library, Analytics

### Phase 5: Wallet, Coins, Subscriptions
- Stripe integration, premium plans, coin purchase

### Phase 6: Admin Panel & Settings
- Admin tools, settings, notifications, family profiles, policies

### Phase 7: Polish & Production Readiness
- E2E tests, accessibility, analytics, monitoring, docs

---

## 8. Next Steps for the Team
1. Choose monorepo tool and scaffold project structure
2. Scaffold all screens/components and navigation
3. Set up shared types, API clients, and validation
4. Implement backend DB schema and core APIs
5. Build out features iteratively, following prioritization
6. Write tests and docs for all features
7. Set up CI/CD, monitoring, and analytics

---

**This plan is ready for a senior team to execute and deliver Sonari to production.**