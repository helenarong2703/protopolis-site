# Protopolis Lab Website

## Overview
Research lab website for Protopolis Lab (NYU Shanghai), deployed at **protopol.is** via Vercel.

## Tech Stack
- **Vite + React** (plain JavaScript, no TypeScript)
- **CSS files** (no CSS-in-JS, no Tailwind) — one `.css` per component
- **No routing library** — single-page with anchor scroll navigation
- **Google Fonts** loaded via `index.html`: Space Mono, JetBrains Mono, IBM Plex Serif, IBM Plex Sans
- **No external dependencies** beyond React — all effects are hand-rolled

## Project Structure
```
protopolis-site/
├── index.html              # Fonts, meta, favicon
├── public/favicon.svg      # Protocol glyph favicon
├── src/
│   ├── main.jsx            # Entry point (default Vite)
│   ├── App.jsx             # Root component: loading screen + layout shell
│   ├── index.css           # CSS variables, reset, keyframe animations, app shell
│   ├── data/
│   │   ├── pillars.js      # Four research pillars with full publication lists
│   │   ├── team.js         # Team member data
│   │   ├── resources.js    # Resources/toolkits data
│   │   └── initiative.js   # "Beyond Techno-Materialism" initiative data
│   └── components/
│       ├── NoiseCanvas.jsx/.css      # Canvas-based animated grain overlay
│       ├── FloatingGlyphs.jsx/.css   # Falling protocol characters
│       ├── Navbar.jsx/.css           # Fixed top nav with section tracking
│       ├── Hero.jsx/.css             # Hero/about section with glitch text
│       ├── Pillars.jsx/.css          # Expandable research pillar cards
│       ├── Initiative.jsx/.css       # "Beyond Techno-Materialism" section
│       ├── Team.jsx/.css             # Team member grid
│       ├── Resources.jsx/.css        # Resource cards with status badges
│       ├── News.jsx/.css             # Placeholder news section
│       └── Contact.jsx/.css          # Contact links + footer
```

## Design System
- **Background**: `#0a0a0a` (near-black)
- **Primary accent**: `#00ff88` (green) — used for active states, links, status indicators
- **Secondary accent**: `#ffaa00` (amber) — used for the initiative section and "COMPILING" status
- **Font roles**: Space Mono = headings, JetBrains Mono = labels/code/UI chrome, IBM Plex Serif = body text, IBM Plex Sans = tags/descriptions
- **CSS variables** defined in `index.css` under `:root` (prefixed `--color-*` and `--font-*`)

## Visual Effects
All effects are CSS/canvas-based, no libraries:
- **NoiseCanvas**: Full-screen canvas overlay with `mix-blend-mode: overlay`, redraws random grain every 100ms
- **FloatingGlyphs**: 30 protocol characters (`⟨⟩{}[]|/\→←` etc.) falling via `floatDown` keyframe
- **Scanline**: 2px green bar sweeping down the viewport on 8s loop
- **Glitch text**: Hero title randomly triggers `glitchShift` animation every 4-7 seconds
- **Loading screen**: Fake progress bar that fills over ~1.5s before revealing the site

## Key Animations (defined in index.css)
- `floatDown` — glyph descent
- `fadeSlideIn` — expand/reveal for pillar works and initiative works
- `pulseGlow` — status line breathing
- `scanline` — green line sweep
- `glitchShift` — hero title glitch

## Content Source
- Full publication data sourced from `protopolis_lab_revised.docx` (not committed)
- Design mockup reference: `protopolis-dark.jsx` (not committed)
- Both files live in the project root but are `.gitignore`d

## Deployment
- **Repo**: github.com/helenarong2703/protopolis-site
- **Host**: Vercel (auto-deploys on push to `main`)
- **Domain**: `protopol.is` (Namecheap DNS → Vercel)
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`

## Commands
```bash
npm run dev      # Local dev server (Vite)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Current Status
- All sections implemented and matching the mockup design
- Full publication lists from docx integrated into all four pillars + initiative
- News section is a placeholder ("Signal incoming...")
- No analytics, no CMS, no backend — purely static
- Vercel deployment in progress — domain `protopol.is` pending DNS configuration

## Session Log

### 2026-03-04 — Initial Build & Deploy Setup
1. **Scaffolded project**: Created Vite + React app at `/Users/hr2703/protopolis-site/` using `npm create vite@latest --template react`
2. **Decomposed monolithic mockup**: Broke `protopolis-dark.jsx` (1485 lines, all inline styles) into 8 component pairs (JSX + CSS), 4 data modules, and global styles
3. **Integrated full content**: Extracted complete publication lists from `protopolis_lab_revised.docx` into `src/data/pillars.js` — the mockup had abbreviated titles; the data files now have full titles, author lists, and venue details
4. **Extracted CSS**: Converted all inline React styles to BEM-ish class names in dedicated CSS files; defined CSS custom properties (`--color-*`, `--font-*`) in `index.css`
5. **Verified build**: `npm run build` succeeds cleanly (CSS: 12.8KB, JS: 214KB)
6. **Set up git identity**: Configured as Helena Rong / hr2703@nyu.edu
7. **Installed GitHub CLI**: Downloaded `gh` v2.67.0 binary to `~/bin/gh` (no Homebrew available — no sudo access)
8. **Pushed to GitHub**: Created public repo at `github.com/helenarong2703/protopolis-site`, initial commit on `main`
9. **Vercel setup started**: User importing repo on Vercel; project name conflict resolved (use alternate name like `protopol-is` — only affects `.vercel.app` URL, not custom domain)

### Environment Notes
- Machine lacks Homebrew and sudo access — `gh` CLI installed as standalone binary at `~/bin/gh`
- Git global config set: `user.name "Helena Rong"`, `user.email "hr2703@nyu.edu"`
- GitHub account: `helenarong2703`
