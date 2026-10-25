import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchPlayers } from '../api/players';

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ players: [], fetchedAt: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();

    fetchPlayers(controller.signal)
      .then(({ players, fetchedAt }) => setState({ players, fetchedAt, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ players: [], fetchedAt: null, loading: false, error: error.message });
        }
      });

    return () => controller.abort();
  }, [attempt]);

  const reload = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setAttempt((count) => count + 1);
  }, []);

  return <PlayerContext.Provider value={{ ...state, reload }}>{children}</PlayerContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayers = () => useContext(PlayerContext);
