# Link Up: Chat Application

A full-stack real-time chat application built with React, Vite, Zustand, Node.js, Express, MongoDB, and Socket.IO.

## Live Deployment

Hosted app:

- https://link-up-chat-app-1.onrender.com/

This project includes:

- User signup and login
- JWT-based authentication
- Real-time messaging with Socket.IO
- Online user status
- Profile picture upload with Cloudinary
- Separate `frontend` and `backend` apps in one repository

## Tech Stack

- Frontend: React, Vite, Zustand, Tailwind CSS, DaisyUI, Axios, Socket.IO Client
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Socket.IO
- Media Storage: Cloudinary

## Project Structure

```text
chatapp/
├── backend/
│   ├── src/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── package.json
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account

## Environment Variables

Create a root `.env` file in the project folder:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Notes:

- The backend is configured to load `.env` from the project root.
- In development, the frontend runs on `http://localhost:5173`.
- In development, the backend runs on `http://localhost:5001`.

## Installation

Clone the repository and install dependencies for both apps.

```bash
git clone <your-repository-url>
cd chatapp
npm install --prefix backend
npm install --prefix frontend
```

## Run the Project Locally

Start the backend:

```bash
npm run dev --prefix backend
```

Start the frontend in another terminal:

```bash
npm run dev --prefix frontend
```

Then open:

```text
http://localhost:5173
```

## Production Build

Build the frontend and install project dependencies:

```bash
npm run build
```

Start the backend server:

```bash
npm start
```

## Deployment

This app is deployed on Render:

- Production URL: https://link-up-chat-app-1.onrender.com/

Production notes:

- The frontend and backend are served from the same Render web service.
- MongoDB uses MongoDB Atlas in production.
- Static frontend files are served by the Express backend in production mode.

Required backend environment variables on Render:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
```

If deploying the frontend and backend as separate services, also configure:

```env
CORS_ORIGIN=https://your-frontend-url.onrender.com
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

## Available Scripts

Root:

- `npm run build` installs backend/frontend dependencies and builds the frontend
- `npm start` starts the backend server

Backend:

- `npm run dev --prefix backend` runs the backend with nodemon
- `npm run start --prefix backend` runs the backend with Node.js

Frontend:

- `npm run dev --prefix frontend` starts the Vite dev server
- `npm run build --prefix frontend` creates a production build
- `npm run preview --prefix frontend` previews the production build
- `npm run lint --prefix frontend` runs ESLint

## Features

- Authentication with signup and signin
- Protected routes on the backend
- Access token handling on the frontend
- Refresh token stored in HTTP-only cookie
- Real-time one-to-one messaging
- Online users broadcast through Socket.IO
- Sidebar user listing
- Profile image upload support

## API Overview

Authentication routes:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/logout`
- `GET /api/auth/check-auth`
- `PUT /api/auth/update-profile`

Message routes:

- `GET /api/message/users`
- `GET /api/message/:id`
- `POST /api/message/send/:id`

## Author

Viraj Solanki 
