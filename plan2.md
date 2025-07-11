# Sonari Full Build Plan (Multi-Agent Parallelization)

## 1. Project Structure & Tooling

- **Monorepo**: Use Turborepo, Nx, or Yarn workspaces for unified management and parallel builds.
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

## 2. Parallelization Strategy & Coordination

- **Clear API contracts**: Define all shared types and API interfaces in `/shared` first.
- **Independent screen/component tasks**: Each screen/component is a separate file/module, with clear props and API usage.
- **Backend endpoints**: Each endpoint is a separate controller/service, with OpenAPI/Swagger docs for frontend/backend sync.
- **Regular merges**: Agents should merge to main/dev branch frequently to avoid conflicts.
- **Code review**: All PRs require review by at least one other agent.
- **Integration tests**: Run after each merge to catch interface mismatches.
- **Daily standup/check-in**: Agents update status and blockers.

### Example Agent Assignment Table
| Agent | Area      | Task Example                        |
|-------|-----------|-------------------------------------|
| A     | Web       | Home Feed, Playlist View             |
| B     | Web       | Auth Screens, Settings               |
| C     | Mobile    | Now Playing, Upload Center           |
| D     | Backend   | Auth API, Song Upload API            |
| E     | Backend   | Subscription, Wallet, Analytics APIs |
| F     | Shared    | Types, API clients, validation utils |

---

## 3. Scaffolding & Navigation (Parallelizable)

### Web
- Each screen/page is an independent file/component.
- Navigation and layout can be built in parallel to screens.
- Role-based guards as a shared HOC/hook.

### Mobile
- Each screen is an independent file/component.
- Navigation stack/tabs can be set up in parallel.
- Shared UI components (buttons, modals) can be built separately.

### Shared
- Types/interfaces, API clients, and validation can be built in parallel to UI and backend.

---

## 4. Iterative Feature Development (Parallelizable)

### Prioritization Order (but each row can be parallelized)
| Phase | Web Tasks                | Mobile Tasks             | Backend Tasks                | Shared Tasks         |
|-------|--------------------------|--------------------------|------------------------------|----------------------|
| 1     | Splash, Auth, RoleSelect | Splash, Auth, RoleSelect | Auth endpoints, JWT, Email   | User/Auth types      |
| 2     | Home, Search, Playlist   | Home, Search, Playlist   | Song, Playlist, Search APIs  | Song/Playlist types  |
| 3     | Upload, Artist Dash      | Upload, Artist Dash      | Upload, Artist stats APIs    | Upload types         |
| 4     | Wallet, Subscriptions    | Wallet, Subscriptions    | Stripe, Coin, Sub APIs       | Payment types        |
| 5     | Admin Panel              | (N/A)                    | Admin endpoints, analytics   | Admin types          |
| 6     | Settings, Family, 404    | Settings, Family, 404    | Notification, Family APIs    | Notification types   |
| 7     | Popups, Drawers, Modals  | Popups, Drawers, Modals  | (N/A)                        | UI/Toast types       |

- **Within each phase, tasks can be assigned to different agents and worked on in parallel.**
- **APIs and types should be stubbed early so frontend/backend can work independently.**

---

## 5. Backend Implementation (Parallelizable)
- Each API endpoint/controller is a separate file/module.
- DB models/schemas can be built in parallel to API logic.
- Auth, upload, payment, analytics, and admin APIs can be assigned to different agents.
- Use OpenAPI/Swagger for contract-first development.

---

## 6. Best Practices for Multi-Agent Teams
- TypeScript everywhere for type safety
- Centralized error handling and boundaries
- Analytics hooks for all major actions
- Responsive and accessible UI
- Secure secrets in `.env`
- Automated tests and CI/CD
- Code reviews and PRs for all features
- **Frequent communication and documentation of interfaces**

---

## 7. Milestones & Phases (Parallelizable)

### Phase 1: Project Setup & Scaffolding
- Monorepo, tooling, all screen stubs, navigation, shared types (assign by area)

### Phase 2: Auth & Onboarding
- Full flows for signup, login, email verification, password reset (split web/mobile/backend)

### Phase 3: Listener Core
- Home, Search, Library, Now Playing, Playlist, Artist Profile (split by screen/feature)

### Phase 4: Artist Core
- Upload, Dashboard, Content Library, Analytics (split by screen/feature)

### Phase 5: Wallet, Coins, Subscriptions
- Stripe integration, premium plans, coin purchase (split by area)

### Phase 6: Admin Panel & Settings
- Admin tools, settings, notifications, family profiles, policies (split by screen/feature)

### Phase 7: Polish & Production Readiness
- E2E tests, accessibility, analytics, monitoring, docs (assign by specialty)

---

## 8. Next Steps for the Team
1. Assign agents to areas/screens/features using the table above
2. Define shared types and API contracts in `/shared` first
3. Scaffold all screens/components and navigation in parallel
4. Implement backend DB schema and core APIs in parallel
5. Build out features iteratively, following prioritization and parallelization
6. Write tests and docs for all features
7. Set up CI/CD, monitoring, and analytics
8. Hold regular syncs to resolve blockers and merge work

---

**This plan is optimized for a multi-agent team to deliver Sonari to production efficiently and with minimal conflicts.**