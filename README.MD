# Lead Management System — Local Setup

Quick instructions to run this project (backend + frontend) locally.

## Prerequisites
- Node.js (v16+)
- npm
- MongoDB URI (Atlas or local)

## Setup

1. Clone / open repo root:
   cd into the project root.

2. Backend
   - Install:
     ```
     cd backend
     npm install
     ```
   - Create/update `.env` in `backend/` (example): (already pushed for convenient)
     ```
     PORT=9996
     MONGO_URI=<your-mongo-uri>
     JWT_SECRET=<your-jwt-secret>
     ```
     File: [.env](http://_vscodecontentref_/1)
   - Start server (dev):
     ```
     npm run dev
     ```
     Production:
     ```
     npm start
     ```
   - Server entry: [backend/server.js](backend/server.js)  
     DB connect: [`connectDB`](backend/config/db.js) — [backend/config/db.js](backend/config/db.js)

3. Frontend
   - Install:
     ```
     cd frontend
     npm install
     ```
   - Start dev server:
     ```
     npm run dev
     ```
   - Frontend runs via Vite. API base URL is set in [`API`](frontend/src/api/api.js) — [frontend/src/api/api.js](frontend/src/api/api.js). Ensure backend PORT matches that URL (default: `http://localhost:9996/api`).

## Usage
- Open the frontend URL shown by Vite (default http://localhost:5173).  
- Register → Login. Token is stored in localStorage (`token`) and used by the [`API`](frontend/src/api/api.js) interceptor.  
- Manage leads from Dashboard / Lead Listing pages.

## Common commands
- Backend dev: from /backend