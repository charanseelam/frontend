# Railway Deployment for forex-backend

This folder is the Railway service root for the backend.

## Required service configuration

- Service Root: `forex-ui/forex-backend`
- Start command: `npm start`
- Port: Railway sets `PORT` automatically
- Node version: 18 (supported by `.nvmrc`)

## Files included

- `package.json` — backend dependencies and start script
- `server.js` — Express app entrypoint
- `Procfile` — `web: npm start`
- `Dockerfile` — builds the backend with sqlite3 support
- `.nvmrc` — Node 18 runtime version
- `.dockerignore` — excludes unnecessary files from Docker builds

## Deployment options

### Option 1: Railway Node deployment
1. Create a new Railway project.
2. Connect the GitHub repo.
3. Set the service root to this folder: `forex-ui/forex-backend`
4. Ensure Railway uses the `package.json` here and runs `npm install`.
5. Set the start command to `npm start`.

### Option 2: Railway Docker deployment
1. Create a Railway project.
2. Connect the repo and set service root to `forex-ui/forex-backend`
3. Railway will use the `Dockerfile` in this folder.

## Common failure points

- Railway selected the wrong subfolder (`forex-backend/forex-backend` instead of `forex-ui/forex-backend`).
- `npm start` is not run from the correct folder.
- Environment uses an unsupported Node version; `.nvmrc` forces Node 18.
- SQLite file persistence is not supported across multiple containers; use a single instance.

## Local test

```bash
cd forex-ui/forex-backend
npm install
npm start
```

If the backend starts and shows `Server running on http://0.0.0.0:5000`, the deployment root and startup command are correct.
