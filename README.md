# Sonari Backend

This is the backend API server for the Sonari music streaming platform.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your environment variables (see `.env.example`).
3. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev` - Start server with nodemon
- `npm test` - Run tests

## Folder Structure
- `src/` - Main source code
- `config/` - Configuration files
- `middleware/` - Express middleware
- `models/` - Mongoose models
- `routes/` - API routes
- `tests/` - Test suites
- `utils/` - Utility functions
- `services/` - Service logic
- Copy `.env.example` to `.env` and update values as needed