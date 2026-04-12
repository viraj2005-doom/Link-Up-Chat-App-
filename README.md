# Link Up: Chat Application

A full-stack real-time chat app built with React, Vite, Zustand, Node.js, Express, MongoDB, and Socket.IO.

Live app: https://link-up-chat-app-1.onrender.com/

## Features

- Email/password signup and signin
- Google signin with Firebase Authentication
- Backend verification of Firebase ID tokens using Firebase Admin
- JWT access token + refresh token (HTTP-only cookie)
- Protected routes and auth checks
- Real-time one-to-one messaging with Socket.IO
- Online user presence
- Profile image upload with Cloudinary

## Tech Stack

- Frontend: React, Vite, Zustand, Tailwind CSS, DaisyUI, Axios, Socket.IO Client, Firebase SDK
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Socket.IO, Firebase Admin SDK
- Media Storage: Cloudinary

## Project Structure

```text
Link-Up-Chat-App-/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   └── auth.route.js
│   │   ├── services/
│   │   │   └── firebase-admin.js
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── firebase.js
│   │   ├── pages/
│   │   └── store/
│   │       └── useAuthStore.js
│   └── package.json
├── package.json
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Firebase project (Google provider enabled in Firebase Authentication)

## Environment Variables

### Backend (`/backend/.env` or root `/.env`)

The backend loads environment variables from either project root `.env` or `backend/.env`.

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_service_account_client_email
FIREBASE_PRIVATE_KEY=your_firebase_service_account_private_key_with_escaped_newlines
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

For `FIREBASE_PRIVATE_KEY`, keep line breaks escaped as `\n` in `.env`.

### Frontend (`/frontend/.env`)

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
VITE_FIREBASE_API_KEY=your_firebase_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## Installation

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Run Locally

Terminal 1 (backend):

```bash
npm run dev --prefix backend
```

Terminal 2 (frontend):

```bash
npm run dev --prefix frontend
```

Open: `http://localhost:5173`

## Build and Start (Production)

```bash
npm run build
npm start
```

## Authentication Flow

- Local auth:
  - `POST /api/auth/signup`
  - `POST /api/auth/signin`
- Google auth:
  - Frontend uses Firebase `signInWithPopup`
  - Frontend sends Firebase `idToken` to backend
  - Backend verifies token via Firebase Admin and signs user in/up
  - Endpoint: `POST /api/auth/google`

Additional auth endpoints:

- `GET /api/auth/logout`
- `GET /api/auth/check-auth`
- `PUT /api/auth/update-profile`

## Message API

- `GET /api/message/users`
- `GET /api/message/:id`
- `POST /api/message/send/:id`

## Available Scripts

Root:

- `npm run build` installs backend/frontend dependencies and builds frontend
- `npm start` starts backend server

Backend:

- `npm run dev --prefix backend`
- `npm run start --prefix backend`

Frontend:

- `npm run dev --prefix frontend`
- `npm run build --prefix frontend`
- `npm run preview --prefix frontend`
- `npm run lint --prefix frontend`

## Author

Viraj Solanki
