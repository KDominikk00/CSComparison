import { useEffect, useMemo, useRef, useState } from 'react';
import { usePlayers } from '../context/PlayerContext';

const MAX_VISIBLE = 50;

const PlayerSelector = ({ selected, onSelect }) => {
  const { players, loading, error } = usePlayers();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const close = (event) => {
      if (event.type === 'keydown' ? event.key === 'Escape' : !containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [isOpen]);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return players
      .filter((player) => player.nickname.toLowerCase().includes(needle))
      .sort((a, b) => a.nickname.localeCompare(b.nickname));
  }, [players, query]);

  const choose = (player) => {
    onSelect(player);
    setIsOpen(false);
    setQuery('');
  };

  if (loading) return <div className="text-white">Loading players...</div>;
  if (error) return <div className="text-red-300">{error}</div>;

  return (
    <div ref={containerRef} className="relative w-72">
      <button
        type="button"
        className="py-4 px-4 text-2xl bg-white border border-gray-300 flex items-center rounded-sm w-full"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 w-full min-w-0">
          {selected ? (
            <>
              <img src={selected.teamLogoUrl} alt="" className="w-8 h-8 object-contain" />
              <span className="font-semibold truncate">{selected.nickname}</span>
            </>
          ) : (
            <span>Select a player</span>
          )}
        </div>
        <span className="ml-auto">&#9662;</span>
      </button>

      {isOpen && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-sm z-10 max-h-64 overflow-y-auto">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search players"
            className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none"
          />
          <ul role="listbox">
            {matches.length > 0 ? (
              matches.slice(0, MAX_VISIBLE).map((player) => (
                <li
                  key={player.slug}
                  role="option"
                  aria-selected={player.slug === selected?.slug}
                  className="py-2 px-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => choose(player)}
                >
                  <img src={player.teamLogoUrl} alt="" className="w-6 h-6 object-contain" />
                  <span>{player.nickname}</span>
                  <span className="ml-auto text-xs text-gray-500">{player.team}</span>
                </li>
              ))
            ) : (
              <li className="py-2 px-4 text-gray-500">No players found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerSelector;
