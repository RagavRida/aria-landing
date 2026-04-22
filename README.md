<p align="center">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

# 🎨 ARIA Landing

Marketing + auth frontend for **[ARIA — Autonomous Research Intelligence Agent](https://github.com/RagavRida/research-agent)**.
Scroll-driven storytelling of the self-correcting LangGraph loop, a live
SSE trace replay, and `/signin` + `/signup` pages wired to the FastAPI
backend with real JWT.

| | |
|---|---|
| 🌐 **Live** | https://aria-landing-one.vercel.app |
| 🔌 **Backend** | [`RagavRida/research-agent`](https://github.com/RagavRida/research-agent) |
| 📊 **Agent trace** | [`public/agent_trace.json`](./public/agent_trace.json) |

---

## 🤖 Built with Claude Code

This landing was built in collaboration with [Claude Code](https://claude.com/claude-code),
Anthropic's CLI coding agent, across sessions on **2026-04-20 → 2026-04-22**.
AI-assisted components include the Vite + React 19 scaffolding, the
scroll-driven hero sequence, the auth client in [`src/lib/auth.ts`](./src/lib/auth.ts),
the Express wrapper in [`server.ts`](./server.ts), and the Vercel proxy config
that keeps `/api/*` same-origin with the FastAPI backend on Railway.

Commits are authored by the project owner; Claude Code was used as a
pair-programmer throughout, not as a ghostwriter.

---

## 🚀 Run locally

```bash
git clone https://github.com/RagavRida/aria-landing
cd aria-landing
npm install
cp .env.example .env
# edit .env — VITE_API_BASE_URL should point at your FastAPI host
npm run dev                  # → http://localhost:3000
```

`npm run dev` launches `server.ts` (Express wrapping Vite). In production
(`NODE_ENV=production`) the same server serves the built SPA from `dist/`.

## 🔐 Auth flow

`src/lib/auth.ts` POSTs to the backend:

- `VITE_API_BASE_URL/api/auth/signup` → stores `aria_token` in `localStorage`
- `VITE_API_BASE_URL/api/auth/signin` → same
- `VITE_API_BASE_URL/api/auth/me` → bearer-auth check

Auth errors surface inline under the submit button (not a toast). A saved
query (`?q=…`) is preserved through signup and auto-runs after.

## 🧰 Stack

- **Vite 6** + **React 19** + **TypeScript 5**
- **Tailwind v4** + shadcn/ui + Motion
- **React Router 7** for `/`, `/signin`, `/signup`
- Auth client in `src/lib/auth.ts`
- Express wrapper in `server.ts` (dev middleware; SPA fallback in prod)

## ☁️ Deploy (Vercel)

```bash
vercel --prod
# then set VITE_API_BASE_URL in Vercel dashboard → your Render backend URL
```

`vercel.json` handles SPA rewrites to `index.html`. CORS on the backend
accepts `*.vercel.app` via `allow_origin_regex`, so preview URLs work
without extra config.

## 🧪 CI

`.github/workflows/ci.yml` runs `tsc --noEmit` + `vite build` on every
push and PR to `main`.

---

**License:** MIT
