# GPUForge

Interactive 3D graphics card explorer. Inspired by [3DCellForge](https://github.com/huangserva/3DCellForge), but for GPUs instead of biological cells.

## Features (v1)

- 3D viewer per GPU with orbit controls, screenshot, and GLB export
- Gallery of 4 cards: RTX 4090, RTX 4080, RX 7900 XTX, RTX 3090
- Spec panel (compute, memory, power, form factor, market)
- Clickable component hotspots — die, VRAM, fan, heatsink, IO bracket, PCIe edge, power connector
- Side-by-side `/compare` route with spec-diff table (winner highlighting per row)
- Per-card notes, persisted to `localStorage`

GPUs are rendered as procedural models built from Three.js primitives — no third-party asset sourcing required.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript strict
- React Three Fiber + Drei (three.js)
- Zustand (notes, selection, viewer actions)
- Tailwind v4

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build   # production build
npm run lint    # eslint
```

## Routes

- `/` — gallery
- `/gpu/[slug]` — single-card viewer + specs + notes (statically prerendered via `generateStaticParams`)
- `/compare?a=<slug>&b=<slug>` — side-by-side comparison

## Phase 2 (deferred)

AI image-to-3D generation (Tripo / Rodin / Hunyuan3D providers) is the planned next phase. Because the app runs on Next.js, the provider proxy lives as an API route under `src/app/api/`, keeping API keys server-side.
