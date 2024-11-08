import React, { useState } from 'react';

const players = [
  { name: 'Zywoo', image: '/vitality.png' },
  { name: 's1mple', image: '/vitality.png' },
  { name: 'PashaBiceps', image: '/vitality.png' },
  { name: 'Snax', image: '/vitality.png' },
];

const PlayerSelector = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (player) => {
    setSelectedPlayer(player);
    setIsOpen(false);
  };

  return (
    <section className="flex justify-center">
      <div className="m-52 mt-28">
        <button
          className="py-4 px-4 text-2xl bg-white border border-gray-300 flex rounded-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Flex container with gap for spacing */}
          <div className="flex gap-4">
            <img src={selectedPlayer.image} alt={selectedPlayer.name} className="w-8 h-8" />
            <span className="font-semibold mr-20">{selectedPlayer.name}</span>
          </div>
          {/* Dropdown icon with added margin for spacing */}
          <span className="ml-10">&#9662;</span>
        </button>
        {isOpen && (
          <ul className="absolute w-72 bg-white border border-gray-300 rounded-sm shadow-lg z-10">
            {players.map((player) => (
              <li
                key={player.name}
                className="py-2 px-4 flex items-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(player)}
              >
                <img src={player.image} alt={player.name} className="w-6 h-6 rounded-full mr-4" />
                <span className="ml-2">{player.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PlayerSelector;