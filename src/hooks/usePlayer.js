import { useEffect, useState } from 'react';
import { fetchPlayer } from '../api/players';

/** Loads the full stats of one player. */
export const usePlayer = (slug) => {
  const [state, setState] = useState({ slug: null, player: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetchPlayer(slug, controller.signal)
      .then((player) => setState({ slug, player, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ slug, player: null, error: error.message });
        }
      });

    return () => controller.abort();
  }, [slug]);

  const loading = state.slug !== slug;
  return { player: loading ? null : state.player, error: loading ? null : state.error, loading };
};
