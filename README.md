# tanmay-portfolio

Personal site for Tanmay Saxena — AI/ML Engineer.

Live: https://jawsenigma.netlify.app

## Stack

- **Next.js 16** (App Router, RSC, route handlers)
- **React 19** + **TypeScript** strict
- **Tailwind CSS 4** with `@theme` design tokens
- **Three.js** — Avatar3D (pose-driven wireframe humanoid) + ParticleField hero background
- **MediaPipe Tasks Vision** — client-side Pose Landmarker (worldLandmarks → bone rotations)
- **Groq** (`llama-3.3-70b-versatile`) via OpenAI-compatible API for the chat agent — free tier
- **Netlify** hosting

## Local dev

```bash
pnpm install
cp .env.example .env.local        # then add your GROQ_API_KEY
pnpm dev
```

Open http://localhost:3000.

## Architecture

```
app/
├── layout.tsx              # Root layout, Geist fonts, Nav + Footer + ChatWidget
├── page.tsx                # Homepage — hero, work, stack, about, contact
├── globals.css             # Design tokens (@theme), prose styles, animations
├── projects/[slug]/        # Dynamic project case-study pages
├── resume/                 # Single AI/ML résumé page with inline PDF preview
└── api/chat/               # Groq streaming endpoint (Llama 3.3 70B)

components/
├── nav.tsx, footer.tsx     # Site shell
├── hero.tsx                # Cinematic hero with particle field + 3D avatar
├── particle-field.tsx      # Three.js point-cloud background (additive blending)
├── avatar-3d.tsx           # Wireframe humanoid (idle sway + opt-in MediaPipe pose)
├── stack-grid.tsx          # AI/ML stack section (foundations / speech / CV / infra)
├── project-card.tsx        # Project tile w/ metrics + stack chips
├── chat-widget.tsx         # Floating "Ask my portfolio" chat (streaming)
└── icons.tsx               # GitHub + LinkedIn brand SVGs

lib/
├── utils.ts                # cn(), RESUME_PATH, TAGLINE
├── projects.ts             # Projects + getProject(slug)
└── agent-context.ts        # System prompt + portfolio context for chat
```

## Hero composition

Three Three.js scenes layered:

1. **`<ParticleField>`** — full-bleed background, ~750 additively-blended points in a sphere, slow rotation, subtle mouse parallax, ~80 connecting lines for graph aesthetic
2. **`<Avatar3D>`** — wireframe humanoid (33 joints + 22 bones), procedural idle sway by default, opt-in MediaPipe pose-mirroring on demand
3. **Page content** — hero text, stats, CTAs, with a backdrop blur on the résumé button

Each Three.js component dynamically imports `three` inside `useEffect` so the initial bundle stays slim.

## Chat agent

`app/api/chat/route.ts`:

1. Receives `{ messages: [{ role, content }] }` POST
2. Trims to last 20 turns
3. Calls `client.chat.completions.create({ stream: true })`:
   - `model: "llama-3.3-70b-versatile"`
   - `baseURL: "https://api.groq.com/openai/v1"`
   - `system`: instructions + portfolio context as a single message
4. Pipes OpenAI-compatible `delta.content` chunks into a `ReadableStream<Uint8Array>`
5. `chat-widget.tsx` reads via `getReader()` + `TextDecoder`, streaming into the latest assistant message

**Cost**: $0/turn within Groq's free-tier rate limits (~30 req/min, ~14,400 req/day). Sub-second responses thanks to Groq's LPU.

## Pose mirror in the avatar

`components/avatar-3d.tsx`:

1. **Idle (default)**: procedural sway (hip swing, breath, head bob, arm swing) + slow auto-rotation around Y axis. Looks alive without any permission.
2. **Mirror me**: requests `getUserMedia({ video, audio: false })`, dynamically imports `@mediapipe/tasks-vision`, loads `pose_landmarker_lite.task` from Google's model CDN with GPU delegate
3. Runs `detectForVideo()` per RAF, uses **`worldLandmarks`** (true 3D coords, not 2D image projection) to drive joint positions
4. Lerp-smoothed between frames; mirrored on X for selfie view

Video never leaves the device — same client-side privacy pattern as Directly.

## Deploy (Netlify)

1. Push to GitHub
2. Connect repo on Netlify (build settings auto-detect from `netlify.toml`, Node 20)
3. **Site configuration → Environment variables → `GROQ_API_KEY`** = your `gsk_...`
4. Deploy

## License

MIT.
