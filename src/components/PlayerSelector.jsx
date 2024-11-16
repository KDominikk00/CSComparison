import React, { useState, useEffect, useRef, useMemo } from 'react';
import { usePlayers } from '../context/PlayerContext';

const PlayerSelector = ({ onSelect }) => {
  const { players, loading, error } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const [page, setPage] = useState(1);

  const containerRef = useRef(null);

  const handleSelect = (player) => {
    setSelectedPlayer(player);
    setIsOpen(false);
    onSelect(player);
  };

  const filteredPlayers = useMemo(() => {
    return players
      .filter((player) =>
        player.playerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.playerName.localeCompare(b.playerName));
  }, [players, searchQuery]);

  useEffect(() => {
    const playersToShow = filteredPlayers.slice(0, page * 20);
    setVisiblePlayers(playersToShow);
  }, [filteredPlayers, page]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading) return <div>Loading players... (This may take a while)</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="flex justify-center">
      <div className="m-52 mt-28 mb-16">
        <button
          className="py-4 px-4 text-2xl bg-white border border-gray-300 flex items-center rounded-sm w-72"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex gap-4 w-full">
            {selectedPlayer ? (
              <>
                <img src={selectedPlayer.teamLogo} alt={selectedPlayer.playerName} className="w-8 h-8" />
                <span className="font-semibold truncate">{selectedPlayer.playerName}</span>
              </>
            ) : (
              <span>Select a player</span>
            )}
          </div>
          <span className="ml-auto">&#9662;</span>
        </button>

        {isOpen && (
          <div
            ref={containerRef}
            className="absolute w-72 bg-white border border-gray-300 rounded-sm z-10 max-h-48 overflow-y-auto"
            onScroll={handleScroll}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players"
              className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none"
            />
            <ul>
              {visiblePlayers.length > 0 ? (
                visiblePlayers.map((player) => (
                  <li
                    key={player.name}
                    className="py-2 px-4 flex items-center cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelect(player)} 
                  >
                    <img src={player.teamLogo} alt={player.playerName} className="w-6 h-6 rounded-full mr-4" />
                    <span className="ml-2">{player.playerName}</span>
                  </li>
                ))
              ) : (
                <li className="py-2 px-4 text-gray-500">No players found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlayerSelector;