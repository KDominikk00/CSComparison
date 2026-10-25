const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');

async function get(path, signal) {
  const response = await fetch(`${BASE_URL}/api/v1${path}`, { signal });
  if (response.status === 503) {
    throw new Error('The server is still collecting player data. Please try again in a few minutes.');
  }
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

/** Summary of every player, plus when the data was scraped. */
export const fetchPlayers = (signal) => get('/players', signal);

/** One player with every stat category. */
export const fetchPlayer = (slug, signal) => get(`/players/${encodeURIComponent(slug)}`, signal);
