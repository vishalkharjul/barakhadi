# Barakhadi — Technical Design

## Architecture
- **Frontend-only SPA** — No backend needed for MVP
- **Static hosting** — Deployed on Vercel (free tier)
- Max 10 concurrent users — no scaling concerns

## Tech Stack
| Area | Choice |
|---|---|
| Framework | React + Vite |
| Styling | Tailwind CSS |
| Tracing | HTML Canvas API |
| Vowel Outlines | SVG paths rendered as canvas guides (dotted/faded) |
| Audio | Static `.mp3` files via Web Audio API |
| Animations | CSS animations + lightweight library (e.g., confetti) |
| Deployment | Vercel (auto-deploy from GitHub) |
| Language | JavaScript (can migrate to TypeScript later) |

## Component Structure (Planned)
```
src/
├── components/
│   ├── VowelGrid.jsx        — Home screen grid of 12 vowels
│   ├── TracingCanvas.jsx     — Canvas for finger/mouse tracing
│   ├── GuideOverlay.jsx      — Dotted outline of the vowel
│   ├── FeedbackOverlay.jsx   — Stars/celebration animation
│   └── AudioPlayer.jsx       — Pronunciation playback
├── data/
│   ├── vowels.js             — Vowel metadata (label, audio path, SVG path)
│   └── strokePaths/          — SVG stroke data per vowel
├── assets/
│   ├── audio/                — Pronunciation .mp3 files
│   └── images/               — Icons, backgrounds
├── App.jsx
└── main.jsx
```

## Future: Animated Guide Character (Post-MVP)
- Animated mascot to narrate and guide kids through tracing
- **Lottie** (After Effects → JSON) or **Rive** (interactive, state-based) are top candidates
- Both are lightweight, GPU-accelerated, and integrate seamlessly with React
- Decision to be made when this feature is picked up

## Key Design Principles
1. **Kid-first UX** — Everything large, colorful, touch-friendly
2. **Zero friction** — No login, no setup, just open and trace
3. **Responsive** — Canvas scales to device, works on phone/tablet
4. **Incremental** — Build feature by feature, learn as we go
