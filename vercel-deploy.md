Vercel deployment steps (frontend)

1) Install Vercel CLI (optional, you can use the web UI instead)

```bash
npm i -g vercel
vercel login
```

2) Set the `VITE_API_URL` environment variable (Production)

- Using the CLI (interactive):

```bash
cd forex-ui
vercel env add VITE_API_URL production
# paste your backend URL (https://backend-production-5d72.up.railway.app) when prompted
```

- Or set it in the Vercel Dashboard: Project → Settings → Environment Variables → Add `VITE_API_URL` with your backend URL (https://backend-production-5d72.up.railway.app/api).

3) Deploy

```bash
# from the frontend root
cd forex-ui
vercel --prod
```

4) Optional: Proxy `/api` to backend via `vercel.json`
-- Note: It's simpler and more reliable to set `VITE_API_URL` in Vercel environment variables to `https://backend-production-5d72.up.railway.app/api` and not attempt to proxy requests from `vercel.json`.

Notes
- Ensure your backend is HTTPS and publicly reachable at `https://backend-production-5d72.up.railway.app`.
