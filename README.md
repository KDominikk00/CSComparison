<p align="center">
  <img src="public/CSComparison.png" alt="CSComparison Banner" width="100%" />
</p>

# CSComparison

Compare the stats of two professional Counter-Strike 2 players side by side. Pick any two players and see their score, K/D, damage, results over the last 6 months, aim, grenades, economy, accuracy by body part and score per map, with the better value highlighted. Without a selection the page shows a leaderboard of the top players by score.

Built with React 18, Vite and Tailwind CSS. The data comes from the [CS Stats API](https://github.com/KDominikk00/HLTVScraper), a Spring Boot service that scrapes [bo3.gg](https://bo3.gg) once a day.

## Run locally

Start the API first (see its README), then:

```bash
cp .env.example .env
npm install
npm run dev
```

## Configuration

| Variable | Default | |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | base URL of the API, without a trailing slash |

It is read at build time, so set it in the hosting provider's environment settings before building.

## Scripts

- `npm run dev` starts the dev server
- `npm run build` creates a production build in `dist`
- `npm run lint` runs ESLint
