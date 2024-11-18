import React, { useState } from 'react';
import PlayerSelector from './PlayerSelector';
import Compare from './Compare';  
import ExtraStats from './ExtraStats'; 

const Main = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([null, null]);
  const [isComparing, setIsComparing] = useState(false); 

  const handlePlayerSelect = (player, index) => {
    const updatedPlayers = [...selectedPlayers];
    updatedPlayers[index] = player;
    setSelectedPlayers(updatedPlayers);
  };

  const handleCompare = () => {
    if (selectedPlayers[0] && selectedPlayers[1]) {
      setIsComparing(true); 
    }
  };

  return (
    <>
      <main className="flex flex-col md:flex-row justify-center items-center p-4">
        {/* Player Selector 1 */}
        <PlayerSelector onSelect={(player) => handlePlayerSelect(player, 0)} />
        
        {/* VS Label */}
        <span className="text-xl text-white mt-6 md:mt-0 md:mx-8">VS</span>
        
        {/* Player Selector 2 */}
        <PlayerSelector onSelect={(player) => handlePlayerSelect(player, 1)} />
      </main>

      {/* Compare Button */}
      {selectedPlayers[0] && selectedPlayers[1] && (
        <div className="text-center mt-6">
          <button
            onClick={handleCompare}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 md:py-4 md:px-10 rounded mb-10"
          >
            Compare
          </button>
        </div>
      )}

      {/* Comparison or Extra Stats */}
      {isComparing ? (
        <Compare player1={selectedPlayers[0]} player2={selectedPlayers[1]} />
      ) : (
        <ExtraStats />
      )}
    </>
  );
};

export default Main;