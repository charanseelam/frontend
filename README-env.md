Frontend environment setup

1. Local development
- Copy `.env.example` to `.env` at the project root and edit the `VITE_API_URL` value:

```bash
cd forex-ui
cp .env.example .env
# edit .env and set VITE_API_URL=https://your-backend.example/api
npm install
npm run dev
```

2. Cloudflare Pages / Vercel (frontend) — making the frontend reach your deployed backend

- Cloudflare Pages (recommended for static builds):
  - In your Pages project, go to Settings → Environment variables and add:
    - `VITE_API_URL` = `https://backend-production-5d72.up.railway.app/api`
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Redeploy the site.

- Vercel:
  - In your Vercel dashboard, open the project settings → Environment Variables.
  - Add `VITE_API_URL` with the value `https://backend-production-5d72.up.railway.app/api` for Production (and Preview if needed).
  - Redeploy the frontend.

3. Notes
- The frontend falls back to `/api` when `VITE_API_URL` is unset; use this only for monorepo serverless setups where backend functions live under `/api`.
- Ensure your backend is publicly reachable (HTTPS) and CORS allows your frontend origin.
