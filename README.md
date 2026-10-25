<p align="center">
  <img src="public/CSComparison.png" width="320" alt="CSComparison logo" />
</p>

<h1 align="center">CSComparison</h1>

<p align="center">
  <em>Who is actually better?</em><br />
  Compare any two professional Counter-Strike 2 players side by side: score, K/D, damage, aim,
  grenades, economy, accuracy by body part and score per map, with the better value highlighted.
</p>

<p align="center">
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" />
  <img alt="Vite 5" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind CSS 3" src="https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="ESLint 9" src="https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white" />
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Vercel-deployed-black?logo=vercel" />
</p>

<p align="center">
  <a href="https://cscomparison.vercel.app">Live site</a> ·
  <a href="https://github.com/KDominikk00/HLTVScraper">Scraper and API repo</a>
</p>

<p align="center">
  <img src="docs/screenshots/leaderboard.jpg" width="23%" alt="Leaderboard" />
  <img src="docs/screenshots/compare.jpg" width="23%" alt="Two players selected" />
  <img src="docs/screenshots/categories.jpg" width="23%" alt="Stat categories side by side" />
  <img src="docs/screenshots/mobile.jpg" width="10%" alt="Mobile layout" />
</p>

## Features

- **Leaderboard.** Without a selection the page ranks players by score, 50 at a time with a "Show more" button, and shows when the stats were last refreshed.
- **Searchable player pickers.** Type to filter the roughly 250 players, each shown with their team logo.
- **Instant comparison.** As soon as two players are picked, their cards and stat tables appear, with no extra button.
- **Every stat category.** Overview, results over the last 6 months, then Main, Performance, AIM, Grenades, Primary devices, Pistols and Economy, plus accuracy by body part and score per map.
- **Better value highlighted.** The higher number is green, except for stats where lower is better (deaths, opening deaths). Stats with no clear direction, such as kill cost, are not highlighted.
- **Loading and error states.** A clear message while players load and when the API is unreachable or still collecting data.
- **Responsive.** Works from phone to desktop.
- **No accounts.** Nothing is stored about visitors.

## How it works

```
 bo3.gg --(weekly scrape, headless Chrome)--> GitHub release "data" --> CS Stats API (Render)
                                                                                |
                                                          GET /api/v1/players   |   GET /api/v1/players/{slug}
                                                          (once, on page load)  |   (for each selected player)
                                                                                v
                                                                   CSComparison (React, Vercel)
```

The page loads the list of player summaries once and keeps it in a React context. That list feeds the leaderboard and the two pickers. When two players are selected, the full stats of each are fetched from the API and compared in the browser. The numbers come from [bo3.gg](https://bo3.gg), scraped by the [CS Stats API](https://github.com/KDominikk00/HLTVScraper), so the site shows bo3.gg's own `score` rating and not HLTV rating.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, function components and hooks |
| Build | Vite 5 with `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3 (utility classes, no custom CSS beyond the page background) |
| Data | Plain `fetch` with `AbortController`, a context for the player list and a `usePlayer` hook for single players |
| Quality | ESLint 9 (flat config, React and React Hooks rules) |
| Hosting | Vercel, deployed from `main` on every push |

## Getting started

Requirements: Node.js 20+ and a running copy of the [CS Stats API](https://github.com/KDominikk00/HLTVScraper).

```bash
# 1. start the API (in the other repo), a small run is enough
SCRAPER_MAX_PLAYERS=10 SCRAPER_MIN_PLAYERS=5 ./mvnw spring-boot:run

# 2. start the site
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

The live API only accepts requests from the deployed site, so local development needs a local API.

| Script | |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build in `dist` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Configuration

| Variable | Default | |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | Base URL of the API, without a trailing slash. Read at build time, so it must be set in Vercel's environment settings before a build. |

## Project structure

```
src/
  main.jsx, App.jsx      entry point and page layout
  api/players.js         fetchPlayers, fetchPlayer (base URL from VITE_API_BASE_URL)
  context/               PlayerProvider, the player list shared by the whole page
  hooks/usePlayer.js     loads one player's full stats
  components/
    Main.jsx             holds the two selected players, picks leaderboard or comparison
    PlayerSelector.jsx   searchable dropdown
    Leaderboard.jsx      ranked table with "Show more"
    Compare.jsx          builds the comparison rows for every section
    StatTable.jsx        side-by-side rows, highlights the better value
    PlayerCard.jsx, Avatar.jsx, Navbar.jsx, Footer.jsx
  lib/format.js          number formatting
docs/screenshots/        images used in this README
```

## Deployment

The site runs on Vercel. Import the repository, keep the detected Vite preset and set `VITE_API_BASE_URL` to the API's URL, for example `https://cs-stats-api.onrender.com`. Every push to `main` deploys to production. The API must then list the site's address in its `SCRAPER_ALLOWED_ORIGINS`, otherwise the browser blocks the requests.

## Limitations

- **Slow first visit.** The API runs on a free plan that sleeps when idle, so the first request after a quiet spell can take about a minute. The page shows "Loading players..." until it answers.
- **Weekly data.** The stats are refreshed once a week by a scrape that runs on the maintainer's computer. If it misses a week, the previous numbers stay up.
- **Partial player pool.** Only players from the ranked list and current tournaments are included, around 250 in total. Players without a photo get a plain circle.
- **Windows differ.** Results, accuracy and map stats cover the last 6 months, while the in-game categories cover the last 15 matches.
- **No shareable links.** The selected players are not in the URL yet, and there is no router.
- **No automated tests.** Linting and the production build are the checks for now.
- **Unofficial.** The site is a fan project, not affiliated with bo3.gg or Valve. Stats are informational.
