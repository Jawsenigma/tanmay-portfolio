# tanmay-portfolio

Personal site for Tanmay Saxena — AI/ML Engineer.

Live: https://jawsenigma.netlify.app

## Stack

- **Next.js 16** (App Router, RSC, server actions, route handlers)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4** (with `@theme` design tokens)
- **Groq** (`llama-3.3-70b-versatile`) via OpenAI-compatible API for the chat agent — free tier
- **MediaPipe Tasks Vision** for the live pose-mirror hero
- **Netlify** hosting

## Local dev

```bash
pnpm install
cp .env.example .env.local        # then add your GROQ_API_KEY
pnpm dev
```

Open http://localhost:3000.

## Architecture overview

```
app/
├── layout.tsx              # Root layout, Geist fonts, Nav + Footer + ChatWidget
├── page.tsx                # Homepage (role-aware via ?role=ai|fullstack|backend)
├── globals.css             # Design tokens (@theme), prose styles, animations
├── projects/[slug]/        # Dynamic project case-study pages
├── resume/                 # Résumé download page (3 role-targeted PDFs)
└── api/chat/               # Groq streaming endpoint (Llama 3.3 70B / OpenAI-compat)

components/
├── nav.tsx, footer.tsx     # Site shell
├── hero.tsx                # Hero with role toggle + pose mirror
├── role-toggle.tsx         # Client-side role switcher (URL param-driven)
├── project-card.tsx        # Project tile w/ metrics + stack chips
├── pose-mirror.tsx         # MediaPipe Pose Landmarker (client-side, opt-in camera)
└── chat-widget.tsx         # Floating "Ask my portfolio" chat (streaming)

lib/
├── utils.ts                # cn(), Role type, ROLE_META
├── projects.ts             # All projects + role-aware ranking
└── agent-context.ts        # System prompt + portfolio context for chat
```

## How role targeting works

The homepage reads `?role=` from the URL (one of `ai`, `fullstack`, `backend`):

- `ROLE_META[role]` swaps the hero tagline and the résumé PDF link
- `projectsForRole(role)` re-ranks the project list using `roleWeight` defined per project in `lib/projects.ts`
- `<RoleToggle>` is a client component that updates the URL via `router.replace()` without a full reload

Default role is `ai` (no param).

## How the chat agent works

`app/api/chat/route.ts`:

1. Receives `{ messages: [{ role, content }] }` POST
2. Validates and trims to last 20 turns
3. Calls `client.chat.completions.create({ stream: true })` with:
   - `model: "llama-3.3-70b-versatile"`
   - `system`: a single message combining instructions + portfolio context (Groq doesn't need separate cache blocks)
   - The user/assistant turn history
4. Pipes OpenAI-compatible `delta.content` chunks into a `ReadableStream<Uint8Array>` returned to the client
5. `chat-widget.tsx` reads the response with `getReader()` + `TextDecoder`, accumulating text into the latest assistant message

Per-turn cost (Groq free tier):
- **$0/turn** within Groq free-tier rate limits (~30 req/min, ~14,400 req/day)
- Sub-second responses thanks to Groq's LPU inference engine

## How the pose mirror works

`components/pose-mirror.tsx`:

1. Idle state: animated SVG skeleton + "Enable camera mirror" button
2. On click: requests `getUserMedia({ video, audio: false })` and dynamically imports `@mediapipe/tasks-vision`
3. Loads `pose_landmarker_lite.task` from Google's model CDN with GPU delegate
4. Runs `detectForVideo()` per `requestAnimationFrame`, draws skeleton lines + joint dots on a canvas overlay (mirrored horizontally so the visitor sees themselves)
5. `cleanupRef` stops the camera stream and closes the landmarker on unmount or "Stop" click

Video never leaves the device — same client-side privacy pattern as my work on Directly.

## Deploy

Netlify auto-detects Next.js. Just:

1. Push to GitHub
2. Connect the repo on Netlify
3. Set env var: `GROQ_API_KEY` in Site settings → Environment variables
4. Deploy

`netlify.toml` pins Node 20 and the Next.js plugin.

## License

MIT.
