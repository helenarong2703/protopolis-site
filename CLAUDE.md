# Protopolis Lab Website

## Overview
Research lab website for Protopolis Lab (NYU Shanghai), deployed at **protopol.is** via Vercel.

## Tech Stack
- **Vite + React** (plain JavaScript, no TypeScript)
- **CSS files** (no CSS-in-JS, no Tailwind) — one `.css` per component
- **react-router-dom** for routing (homepage + individual project pages)
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
│       ├── Pillars.jsx/.css          # Expandable research pillar cards (list view)
│       ├── WorkAreas.jsx/.css       # Interactive network graph with blob clusters (graph view)
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
- **Scanline**: 2px green bar sweeping within the Hero section only (scoped via `position: absolute` + `overflow: hidden`)
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
- Full publication lists from docx integrated into all four research areas + initiative
- 25+ publications linked to external sources (SSRN, arXiv, DOI, project sites)
- Research section has two view modes: interactive network graph (default) and accordion list, toggled via ◎/☰ buttons
- News section is a placeholder ("Signal incoming...")
- No analytics, no CMS, no backend — purely static
- Deployed on Vercel at `protopol.is`

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

### 2026-03-04 — Content Accuracy & Deployment Fix
1. **Fixed Hero about text**: Added two missing sentences from docx — "Guided by classical notions of the polis..." and "Beyond academic papers and conference talks..." — so the about section now matches `protopolis_lab_revised.docx` word-for-word
2. **Added pillar descriptions**: `PillarCard` component now renders the `description` field when a card is expanded (was previously ignored). Added `.pillar-card__description` CSS with `fadeSlideIn` animation
3. **Completed pillar description text**: Filled in truncated descriptions for pillars 2, 3, and 4 in `src/data/pillars.js` to match docx exactly
4. **Committed and pushed**: Second commit `1163d66` pushed to `protopolis-site` repo
5. **Identified Vercel repo mismatch**: User had two GitHub repos — `protopolis-site` (our code, 2 commits) and `protopolis-lab` (empty, 1 default commit). Vercel was connected to the wrong one (`protopolis-lab`). User advised to reconnect Vercel to `protopolis-site`

### 2026-03-16 — Research Areas Redesign & Content Updates
1. **New WorkAreas component**: Replaced the accordion-style Pillars section with an interactive force-directed network graph visualization
   - Three colored clusters: Human (yellow `#f5c542`), Environment (teal `#00d4aa`), AI (purple `#b07aff`)
   - Trust Experience Design (TXD) as a 人-shaped bridge blob connecting all three clusters, with its keyword nodes scattered in interstitial spaces
   - Organic SANAA-style blob backgrounds with breathing animation (slow sinusoidal edge morphing)
   - Constant-velocity node drift (same physics as Hero graph) — no springs/forces, just smooth bounce
   - Cluster labels centred in blobs: "Human", "Environment", "AI" with numbered subtitles
   - Intro line: "Protocols operate wherever collective life does..."
2. **View toggle**: Added ◎/☰ toggle between graph view and original accordion list view
3. **Detail drawer**: Clicking a cluster opens a slide-in panel from the right (solid background, not translucent overlay)
4. **Scanline scoped to Hero**: Moved scanline from global App to inside Hero component with `position: absolute`
5. **Scroll-to-top on navigation**: Added `useLocation` + `useEffect` to scroll to top when navigating to project pages
6. **Scanline removed from project pages**: Only renders on homepage
7. **Nav renamed**: "PILLARS" → "RESEARCH", heading → "Four Research Areas"
8. **External hyperlinks**: Added `url` field to 25+ publications across all four research areas, rendered as clickable links in both graph drawer and list view
9. **Title updates**: "Sovereign Agents" (was "What Is a Sovereign Agent?"), "Public Perception of AVs in China" (was "Public Opinions..."), "Affective Balloons" (was "Senseable City Guide to Paris")
10. **Team roster updated**: Added Felix Beer (Harvard), Sun Zhe (SUFE), Jenna Davis (Hunter College), Helen Xu (UPenn); removed Jiaqi Chen; updated Juncheng Yang affiliation to Harvard
11. **TXD toolkit link**: Updated to NYU Shanghai course page

### Environment Notes
- Machine lacks Homebrew and sudo access — `gh` CLI installed as standalone binary at `~/bin/gh`
- Git global config set: `user.name "Helena Rong"`, `user.email "hr2703@nyu.edu"`
- GitHub account: `helenarong2703`
