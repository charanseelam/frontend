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
# paste your backend URL (https://your-backend.example) when prompted
```

- Or set it in the Vercel Dashboard: Project → Settings → Environment Variables → Add `VITE_API_URL` with your backend URL.

3) Deploy

```bash
# from the frontend root
cd forex-ui
vercel --prod
```

4) Optional: Proxy `/api` to backend via `vercel.json`
- A `vercel.json` file is included that rewrites `/api/*` to the placeholder backend URL. Replace `https://your-backend.example` with your real backend URL and commit. This lets the frontend make same-origin calls to `/api/*` and Vercel will forward them to your backend.

Notes
- If you use the `vercel.json` rewrite, keep `VITE_API_URL` unset so the client uses `/api` fallback, or set `VITE_API_URL` to the public backend URL and remove the rewrite.
- Ensure your backend is HTTPS and publicly reachable.
