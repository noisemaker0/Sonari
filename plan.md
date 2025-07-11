# Sonari Project Plan

## Overview
Sonari is a full-featured music streaming platform with web (React + Tailwind CSS) and mobile (React Native) apps, powered by a Node.js/Express.js backend with PostgreSQL, AWS S3, JWT auth, and Stripe payments. This plan separates frontend and backend tasks, provides a screen-by-screen breakdown, and details user interactions and routing logic. All tasks are designed for production readiness.

---

## �️ Sonari Production Screens Breakdown

### ✅ Full Screens (Main App Views)

#### 🔐 Onboarding
1. Splash Screen
2. Role Selection (Listener / Artist)
3. Sign Up – Listener
4. Sign Up – Artist
5. Login – Listener/Artist
6. Forgot Password
7. Email Verification
8. Blocked Content / Warning Screen

#### 🎧 Listener Core
9. Home (Discovery feed + trending)
10. Search (Genre, Artist, Mood, Region)
11. Library (Saved songs, albums, playlists)
12. Wallet (Coin balance, top-up)
13. Premium Plans Page
14. Coin Purchase Page
15. Subscription Management
16. Podcast Page
17. Album Page
18. Playlist View (Public/Private)
19. Artist Profile View
20. Now Playing Full View
21. Wrapped Experience Page
22. Weekly AI Discovery Page
23. Manage Devices (optional)
24. Settings – General
25. Settings – Profile
26. Settings – Account (Change Password, Delete, Language/Region)
27. Notification Preferences
28. Manage Family Profiles
29. Add Family Profile
30. Terms of Service
31. Privacy Policy
32. 404 Not Found
33. App Update Screen (optional forced update)

#### 🧑‍🎤 Artist-Specific
34. Upload Music / Podcast
35. Edit Uploaded Content
36. Artist Content Library
37. Set Subscription Price
38. Tip Analytics
39. Subscription Analytics
40. Earnings Dashboard
41. View Subscribers

#### 👑 Admin Panel (Web Only)
42. Admin Login
43. User Management
44. Artist Management
45. Upload Moderation
46. Coin Economy Controls
47. Promotion Engine (create/edit deals)
48. Analytics Dashboard
49. Email Blasts Tool
50. Notification Push Tool
51. Payout Manager
52. Country-Based Pricing Controls
53. Feature Toggle Control Center

---

### 🌓 Half-Screens / Panels / Drawers
These typically slide from the bottom or side (for web/mobile):
1. Add to Playlist Drawer
2. Playback Queue Panel
3. Mini Player
4. Search Filter Panel
5. Coin Top-Up Payment Drawer
6. Manage Subscription Drawer
7. Add New Profile Panel (Family plan)
8. Choose Region/Language
9. Manage Email Notifications
10. Listener/Artist Switch Panel

---

### 💬 Popups / Modals / Toasts
These are transient or interactive overlays:
1. Delete Confirmation (e.g., Playlist, Upload, Account)
2. Unsubscribe Confirmation
3. Confirm Tip Popup
4. Confirm Subscription Popup
5. Report Content Modal
6. Tip Successful Toast
7. Subscription Successful Toast
8. Payment Success / Failure
9. General Error Message
10. Logout Confirmation
11. Email Verification Reminder
12. App Version Warning
13. Invite to Family Plan
14. Upload Limit Reached
15. Content Flagged / Rejected Modal

---

## �🟦 Frontend (Web & Mobile)

### Shared Principles
- **TypeScript** for all code
- **Role-based routing** (Listener, Artist, Admin)
- **JWT auth** (persisted in secure storage)
- **Responsive, accessible UI** (Tailwind for web, native for mobile)
- **API error handling, loading states, and analytics events**

### Web: React + Tailwind CSS
### Mobile: React Native (Expo + EAS)

---

### 🔵 FULL SCREEN PAGES

#### 1. Splash Screen
- **Logic:** Animated logo, timeout (2s), then auto-route to Role Selection or Home if already logged in.
- **Routing:** `/splash` → `/role-select` or `/home`

#### 2. Role Selection Screen
- **Logic:** User picks Listener or Artist → sets role in state/context.
- **Routing:** `/role-select` → `/signup-listener` or `/signup-artist`

#### 3. Sign Up (Listener)
- **Fields:** Name, Email, Password, Gender, DOB, Region
- **Button:** "Sign Up" → POST `/api/auth/signup` (role=listener)
- **Routing:** On success, `/verify-email`

#### 4. Sign Up (Artist)
- **Fields:** Stage name, Real name, Email, Password
- **Button:** "Sign Up" → POST `/api/auth/signup` (role=artist)
- **Routing:** On success, `/verify-email`

#### 5. Login Page
- **Fields:** Email, Password
- **Button:** "Login" → POST `/api/auth/login` → store JWT
- **Routing:** On success, `/home` (role-based)

#### 6. Email Verification Screen
- **Logic:** User must verify email (poll or button to resend)
- **Routing:** `/verify-email` → `/home` on verified

#### 7. Home Feed (Listener)
- **Logic:** Fetch new releases, genres, suggestions
- **Routing:** `/home`
- **Buttons:** Play, Like, Add to Playlist, Go to Artist

#### 8. Search Page
- **Logic:** Search/filter songs, artists, podcasts
- **Routing:** `/search`
- **Buttons:** Play, Go to Artist, Add to Playlist

#### 9. Podcast Page
- **Logic:** List/discover podcasts (uploaded by artists)
- **Routing:** `/podcasts`
- **Buttons:** Play, Follow, Go to Artist

#### 10. Playlist View
- **Logic:** View created/followed playlists, toggle public/private
- **Routing:** `/playlist/:id`
- **Buttons:** Play, Remove Song, Edit Playlist

#### 11. Now Playing View
- **Logic:** Full player, cover art, controls, like, queue
- **Routing:** `/now-playing`
- **Buttons:** Play/Pause, Skip, Like, Queue

#### 12. Artist Dashboard
- **Logic:** Stats (plays, tips, subscribers), uploads
- **Routing:** `/artist/dashboard`
- **Buttons:** Upload, View Tips, Manage Subs

#### 13. Upload Center
- **Logic:** Upload music/podcasts (title, genre, tags, file)
- **Routing:** `/artist/upload`
- **Buttons:** Pick File, Submit (POST to `/api/upload`)

#### 14. Subscription Page
- **Logic:** View artist tiers, subscribe with coins
- **Routing:** `/artist/:id/subscribe`
- **Buttons:** Subscribe, Buy Coins

#### 15. Wallet Page
- **Logic:** View coin balance, top up with Stripe
- **Routing:** `/wallet`
- **Buttons:** Top Up, View History

#### 16. Premium Plans
- **Logic:** View/buy plans (Individual, Student, Family)
- **Routing:** `/premium`
- **Buttons:** Subscribe, Learn More

#### 17. Discovery Weekly
- **Logic:** AI-generated playlist (rule-based MVP)
- **Routing:** `/discovery-weekly`
- **Buttons:** Play, Add to Library

#### 18. Sonari Wrapped
- **Logic:** Year-in-review, stats, share
- **Routing:** `/wrapped`
- **Buttons:** Share, Download

#### 19. Settings Page
- **Logic:** Change password, language, crossfade
- **Routing:** `/settings`
- **Buttons:** Save, Logout

#### 20. Admin Panel (Web Only)
- **Logic:** Analytics, user/artist stats, promotions
- **Routing:** `/admin`
- **Buttons:** Feature Flag, Country Pricing, Ban User

---

### 🟡 HALF SCREENS
- **Mini Player:** Always visible, click to expand to Now Playing
- **Manage Playlist:** Modal for add/remove songs
- **Family Plan Manager:** Add/remove profiles (web/mobile)

---

### 🟣 POPUPS
- **Tip Artist:** Enter coins, Stripe flow if low
- **Subscribe to Artist:** Show price, confirm
- **In-App Notifications:** Admin messages, promos
- **Delete Playlist:** Confirm
- **Logout Confirmation:** Confirm

---

### Button Logic & Routing (Examples)
- **Play Button:** Sets current track in player context, routes to Now Playing
- **Upload Button:** Opens file picker, validates, POSTs to `/api/upload`, shows progress
- **Subscribe Button:** Checks coin balance, opens Stripe if needed, POSTs to `/api/subscribe`
- **Admin Actions:** All protected by role, require JWT

---

### Production Readiness
- **Error boundaries** and fallback UIs
- **Analytics events** for all major actions
- **Accessibility:** Keyboard nav, ARIA labels (web)
- **Testing:** Unit, integration, and E2E (Cypress, Detox)
- **CI/CD:** Vercel (web), Expo EAS (mobile), Render/DO (backend)
- **Env config:** All secrets in `.env`, never in code
- **Monitoring:** Sentry, PostHog/Plausible

---

## 🟧 Backend (Node.js, Express, PostgreSQL)

### Core Responsibilities
- **JWT Auth:** Role-based, email verification, password reset
- **User/Artist/Admin Models:** PostgreSQL schemas
- **Upload Handling:** AWS S3 for all media
- **Coin System:** 1 USD = 10 coins, Stripe integration
- **Subscription System:** Recurring Stripe + coin balance
- **Analytics APIs:** Track age, gender, region, usage
- **Admin Controls:** Promotions, feature flags, country pricing
- **Notification APIs:** Push/in-app/email
- **Wrapped/Discovery:** Rule-based playlist logic

---

### API Endpoints (Sample)
- `POST /api/auth/signup` (role, email verification)
- `POST /api/auth/login`
- `POST /api/auth/verify`
- `POST /api/upload` (S3, metadata extraction)
- `POST /api/songs` (create song, link to file)
- `GET /api/feed` (personalized feed)
- `GET /api/search`
- `POST /api/playlist`
- `POST /api/subscribe` (artist, plan)
- `POST /api/coins/topup` (Stripe)
- `GET /api/wallet`
- `GET /api/analytics` (admin)
- `POST /api/notifications`

---

### Production Readiness
- **Rate limiting, CORS, helmet, input validation**
- **Automated tests:** Jest, Supertest
- **DB migrations:** Knex or Prisma
- **Monitoring:** Sentry, logging
- **Secure secrets:** All in `.env`
- **Backups:** Automated for DB and S3

---

## 📝 Next Steps
1. **Design DB schema** (users, artists, songs, playlists, coins, subscriptions)
2. **Set up monorepo** (web, mobile, backend)
3. **Scaffold auth, upload, and player flows**
4. **Implement screen-by-screen, API-by-API**
5. **Write tests and docs for all features**
6. **Prepare for launch: CI/CD, monitoring, analytics**

---

**This plan is ready for a senior team to execute and scale Sonari to production.**