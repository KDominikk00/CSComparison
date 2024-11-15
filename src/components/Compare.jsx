import React from 'react';

const Compare = ({ player1, player2 }) => {
  // Function to calculate and display the difference in stats
  const calculateDifference = (stat1, stat2) => {
    const diff = stat2 - stat1;
    return diff > 0 ? `+${diff}` : diff;
  };

  return (
    <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">Player Comparison</h1>
      <div className="flex justify-between space-x-12">
        {/* Player 1 */}
        <div className="flex-1 p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-xl">
          <img src={player1.teamLogo} alt={player1.team} className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="text-2xl font-semibold mt-6 text-center">{player1.playerName}</h2>
          <p className="text-center text-sm text-gray-600">{player1.team}</p>

          {/* K/D Comparison */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">K/D</p>
            <div className="text-center text-lg font-bold">{player1.kd}</div>
          </div>

          {/* Rating Comparison */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">Rating</p>
            <div className="text-center text-lg font-bold">{player1.rating}</div>
          </div>

          {/* K/D Diff */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">K/D Diff</p>
            <div className="text-center text-lg font-bold">
              {calculateDifference(player1.kd, player2.kd)}
            </div>
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex-1 p-6 bg-gradient-to-r from-red-50 via-red-100 to-red-200 rounded-lg shadow-xl">
          <img src={player2.teamLogo} alt={player2.team} className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="text-2xl font-semibold mt-6 text-center">{player2.playerName}</h2>
          <p className="text-center text-sm text-gray-600">{player2.team}</p>

          {/* K/D Comparison */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">K/D</p>
            <div className="text-center text-lg font-bold">{player2.kd}</div>
          </div>

          {/* Rating Comparison */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">Rating</p>
            <div className="text-center text-lg font-bold">{player2.rating}</div>
          </div>

          {/* K/D Diff */}
          <div className="mt-6">
            <p className="text-center text-sm font-medium text-gray-700">K/D Diff</p>
            <div className="text-center text-lg font-bold">
              {calculateDifference(player2.kd, player1.kd)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compare;