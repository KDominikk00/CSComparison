import React, { useState } from 'react';
import PlayerSelector from './PlayerSelector';
import Compare from './Compare';  // Import the comparison component
import ExtraStats from './ExtraStats'; // Import the ExtraStats component

const Main = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([null, null]); // Array to store two selected players
  const [isComparing, setIsComparing] = useState(false); // Flag to toggle between Compare and ExtraStats view

  // Update selected players
  const handlePlayerSelect = (player, index) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = player;
    setSelectedPlayers(updatedPlayers);
  };

  // Handle Compare button click
  const handleCompare = () => {
    if (selectedPlayers[0] && selectedPlayers[1]) {
      setIsComparing(true); // Switch to comparison view
    }
  };

  return (
    <>
      <main className="flex justify-center">
        {/* First Player Selector */}
        <PlayerSelector onSelect={(player) => handlePlayerSelect(player, 0)} />
        <span className="text-xl text-white mt-32">VS</span>
        {/* Second Player Selector */}
        <PlayerSelector onSelect={(player) => handlePlayerSelect(player, 1)} />
      </main>

      {/* Show Compare Button if both players are selected */}
      {selectedPlayers[0] && selectedPlayers[1] && (
        <div className="text-center mt-6">
          <button
            onClick={handleCompare}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded mb-10"
          >
            Compare
          </button>
        </div>
      )}

      {/* Conditionally render Compare or ExtraStats */}
      {isComparing ? (
        <Compare player1={selectedPlayers[0]} player2={selectedPlayers[1]} />
      ) : (
        <ExtraStats />
      )}
    </>
  );
};

export default Main;