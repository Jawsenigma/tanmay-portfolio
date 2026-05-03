# tanmay-portfolio

Personal site for Tanmay Saxena — AI/ML Engineer.

Live: https://jawsenigma.netlify.app

## Stack

- **Next.js 16** (App Router, RSC, server actions, route handlers)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4** (with `@theme` design tokens)
- **Anthropic Claude** (`claude-sonnet-4-6`) with prompt caching for the chat agent
- **MediaPipe Tasks Vision** for the live pose-mirror hero
- **Netlify** hosting

## Local dev

```bash
pnpm install
cp .env.example .env.local        # then add your ANTHROPIC_API_KEY
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
└── api/chat/               # Claude streaming endpoint w/ prompt caching

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
└── agent-context.ts        # System prompt + cached portfolio context for chat
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
3. Calls `client.messages.stream()` with:
   - `model: "claude-sonnet-4-6"`
   - `system`: two text blocks — instructions + portfolio context, with `cache_control: { type: "ephemeral" }` on the context block
   - The user/assistant turn history
4. Pipes Anthropic's `content_block_delta` events into a `ReadableStream<Uint8Array>` returned to the client
5. `chat-widget.tsx` reads the response with `getReader()` + `TextDecoder`, accumulating text into the latest assistant message

The cache breakpoint sits on the long context block (resume + project details), so per-turn cost is roughly:
- First request: full context tokens (~3K) priced at standard input
- Subsequent requests within 5min: same context priced at ~10% (cache hit) → roughly $0.003/turn

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
3. Set env var: `ANTHROPIC_API_KEY` in Site settings → Environment variables
4. Deploy

`netlify.toml` pins Node 20 and the Next.js plugin.

## License

MIT.
