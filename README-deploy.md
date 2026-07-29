# Deployment Guide

This repository contains two separate deployable applications:

- `forex-ui` — React/Vite frontend
- `forex-ui/forex-backend` — Node/Express backend API with SQLite

## Recommended hosting approach

### Frontend (static site)
Recommended hosts:
- Vercel
- Netlify
- Cloudflare Pages

Build settings:
- install: `npm install`
- build: `npm run build`
- output directory: `dist`

### Backend (Node API)
Recommended hosts:
- Render
- Railway
- Fly.io

Backend settings:
- install: `npm install`
- start: `npm start`
- port: `5000` (default)


## Frontend setup

1. In the root `forex-ui` folder, copy `.env.example` to `.env`:

```bash
cd forex-ui
cp .env.example .env
```

2. Open `.env` and set `VITE_API_URL` to your backend API base URL, for example:

```env
VITE_API_URL=https://your-backend.example/api
```

3. Run the frontend locally:

```bash
npm install
npm run dev
```

4. Deploy the frontend to your chosen host.

### Vercel

- Create a Vercel project from the `forex-ui` repo.
- Set `VITE_API_URL` in Project Settings → Environment Variables.
- Use `npm run build` as the build command and `dist` as the output folder.

> Note: The app will use `VITE_API_URL` for API requests in production. If `VITE_API_URL` is unset in production, it falls back to `/api` only when the hostname is not `localhost`.


## Backend setup

1. Deploy the backend folder `forex-ui/forex-backend` to a Node-compatible host.

2. Ensure the host supports writing to disk or provides a mounted volume for `sqlite3`.

3. Optional environment variables:

- `PORT=5000`
- `ALLOWED_ORIGINS=https://your-frontend.example`

4. If using Render or Railway, point the start command to `npm start`.

5. The backend exposes these routes:

- `GET /` — health check
- `GET /api/rates`
- `GET /api/users`
- `POST /api/register`
- `POST /api/login`
- `POST /api/forgot-password`


## Connecting frontend and backend

- After backend deployment, use the public backend URL in `VITE_API_URL`.
- Example: `https://your-backend.example/api`
- If your backend domain already includes `/api`, remove the extra `/api` from the value.


## Single deployment note

This project is currently split into a frontend static app and a backend Node API. Deploying both together in one host is possible but not recommended because the backend relies on SQLite and requires writable filesystem access.

If you want a single-host deployment, choose a service that supports both Node and persistent storage.
