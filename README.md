# Sonari 🎵

**Sonari** is a next-generation music streaming platform, built for artists and listeners. It features a modern backend API, a cross-platform mobile app, and a scalable architecture ready for future web and analytics expansion.

---

## 🚀 Features
- **User & Artist Authentication** (JWT, refresh tokens)
- **Audio Streaming & Upload** (MP3, WAV, FLAC)
- **Playlists, Albums, Artists, Songs** (full CRUD)
- **Search & Discovery** (multi-type, trending, suggestions)
- **Mobile App** (React Native, Redux, Expo, Track Player)
- **Secure File Uploads** (multer, validation)
- **Comprehensive Testing** (Jest, Supertest, E2E flows)
- **Modern UI/UX** (theming, onboarding, error states)

---

## 📦 Project Structure
```
sonari-project/
├── backend/         # Node.js/Express/MongoDB API
├── mobile/          # React Native mobile app
├── web/             # (future) Web app
├── shared/          # Shared code/utilities
├── docs/            # Documentation
├── scripts/         # DevOps and deployment scripts
└── phase1.md        # Phase 1 summary & progress
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Expo CLI (for mobile)

### Backend Setup
```bash
cd sonari-project/backend
npm install
cp .env.example .env   # Edit with your MongoDB URI and secrets
npm run dev            # Start backend (dev mode)
```

### Mobile App Setup
```bash
cd sonari-project/mobile/SonariApp
npm install
npm start             # Start Expo dev server
```
- Use Expo Go app or an emulator to run the mobile app.
- Ensure your backend API is reachable from your device/emulator.

---

## 🧪 Testing
- **Backend:**
  ```bash
  cd sonari-project/backend
  npm test
  ```
- **Mobile:**
  ```bash
  cd sonari-project/mobile/SonariApp
  npm test
  ```
- **Manual QA:**
  - Register/login, search, play, upload, and manage playlists on the app.
  - Use Postman/Insomnia for API endpoint testing.

---

## 📚 Documentation
- See `phase1.md` for a full breakdown of features, sprints, and progress.
- API docs: [docs/](docs/) (OpenAPI/Swagger coming soon)
- For deployment, see `scripts/` and backend/mobile READMEs.

---

## 🤝 Contributing
1. Fork the repo and create a feature branch.
2. Follow code style and add tests for new features.
3. Submit a pull request with a clear description.
4. All contributions are reviewed and tested before merging.

---

## 🛡️ Security & License
- MIT License
- Please report vulnerabilities via issues or email.

---

## 👥 Credits
- Built by the Sonari Team
- Thanks to the open-source community!