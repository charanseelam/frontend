Deploying the forex-backend

This README explains how to build and deploy the `forex-backend` Node server.

Local Docker (build & run):

```bash
cd forex-backend/forex-backend
docker build -t forex-backend:latest .
docker run -p 5000:5000 -e PORT=5000 forex-backend:latest
# visit http://localhost:5000
```

Railway / Render (quick):
- Create a new project on Railway or Render and connect your GitHub repo, selecting the `forex-backend/forex-backend` folder as the service root.
- Railway/Render will detect `package.json` and run `npm install` then `npm start` by default. Configure env `PORT` if needed.

Heroku (Docker deploy):
- Install the Heroku CLI and login.

```bash
cd forex-backend/forex-backend
heroku create your-app-name
heroku stack:set container
heroku container:push web --app your-app-name
heroku container:release web --app your-app-name
```

Vercel frontend configuration (to reach backend):
- If your frontend is deployed on Vercel, set the environment variable `VITE_API_URL` in the Vercel project settings to your backend's HTTPS URL (e.g. `https://your-backend.example`). Then redeploy the frontend.

Notes:
- SQLite (`forex.db`) is a file-based DB. If you need persistence across deployments or multiple instances, migrate to a managed DB (Postgres, MySQL, Supabase).
- CORS: the backend currently uses `app.use(cors())` which allows all origins. For production, tighten allowed origins.
