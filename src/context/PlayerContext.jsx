import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const PlayerContext = createContext();

// Provider Component
export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/hltv/players");
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ players, loading, error }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom Hook for convenience
export const usePlayers = () => useContext(PlayerContext);