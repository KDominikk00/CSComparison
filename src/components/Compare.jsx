import React from "react";

const Compare = ({ player1, player2 }) => {
  // Calculate average rounds per map
  const player1AvgRounds = (player1.rounds / player1.maps).toFixed(1);
  const player2AvgRounds = (player2.rounds / player2.maps).toFixed(1);

  const MAX_ROUNDS = 30;

  return (
    <div>
      {/* First Part: Stats Comparison */}
      <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">Player Comparison</h1>
        <div className="flex justify-around items-center">
          {/* Player 1 Card */}
          <div className="flex-1 p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-xl max-w-xs mx-auto">
            <img src={player1.teamLogo} alt={player1.team} className="w-16 h-16 rounded-full mx-auto" />
            <h2 className="text-2xl font-semibold mt-4 text-center">{player1.playerName}</h2>
            <p className="text-center text-sm text-gray-600">{player1.team}</p>
            <div className="mt-6 space-y-4">
              <StatItem label="Maps Played" value={player1.maps} />
              <StatItem label="Rounds Played" value={player1.rounds} />
              <StatItem label="K/D" value={player1.kd} />
              <StatItem label="K/D Diff" value={player1.kddiff} />
              <StatItem label="Rating" value={player1.rating} />
            </div>
          </div>

          {/* Comparison Section */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-3xl font-semibold text-gray-700">Vs</p>
            <p className="text-lg text-gray-600">Better stats in green, worse stats in red</p>
          </div>

          {/* Player 2 Card */}
          <div className="flex-1 p-4 bg-gradient-to-r from-red-50 via-red-100 to-red-200 rounded-lg shadow-xl max-w-xs mx-auto">
            <img src={player2.teamLogo} alt={player2.team} className="w-16 h-16 rounded-full mx-auto" />
            <h2 className="text-2xl font-semibold mt-4 text-center">{player2.playerName}</h2>
            <p className="text-center text-sm text-gray-600">{player2.team}</p>
            <div className="mt-6 space-y-4">
              <StatItem label="Maps Played" value={player2.maps} />
              <StatItem label="Rounds Played" value={player2.rounds} />
              <StatItem label="K/D" value={player2.kd} />
              <StatItem label="K/D Diff" value={player2.kddiff} />
              <StatItem label="Rating" value={player2.rating} />
            </div>
          </div>
        </div>
      </section>

      {/* Second Part: Average Rounds Per Match */}
      <section className="w-full max-w-7xl bg-gray-50 m-auto rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Average Rounds Per Match
        </h2>
        <div className="flex flex-col items-start space-y-8">
          {/* Comparison Text */}
          <p className="text-lg font-medium text-gray-700 mb-4">
            {`On average, ${player1.playerName} needs `}
            <span>{player1AvgRounds}</span>
            {` rounds to finish a match, which is `}
            {player1AvgRounds < player2AvgRounds ? (
              <span className="text-green-500">fewer than</span>
            ) : player1AvgRounds > player2AvgRounds ? (
              <span className="text-red-500">more than</span>
            ) : (
              <span className="text-gray-500">equal to</span>
            )}
            {` ${player2.playerName}'s `}
            <span>{player2AvgRounds}</span>
            {` rounds.`}
          </p>

          {/* Player 1 Graph */}
          <div className="w-full">
            <p className="text-lg font-semibold mb-4">{player1.playerName}</p>
            <div className="relative h-14 bg-gray-300 overflow-hidden border-2 border-gray-400 rounded-full">
              <div
                className={`absolute top-0 left-0 h-full ${player1AvgRounds < player2AvgRounds ? "bg-green-500" : "bg-red-500"}`}
                style={{
                  width: `${(player1AvgRounds / MAX_ROUNDS) * 100}%`,
                }}
              ></div>
              <span className="absolute left-2 top-4 text-white">{player1AvgRounds} Rounds</span>
            </div>
          </div>

          {/* Player 2 Graph */}
          <div className="w-full">
            <p className="text-lg font-semibold mb-4">{player2.playerName}</p>
            <div className="relative h-14 bg-gray-300 overflow-hidden border-2 border-gray-400 rounded-full">
              <div
                className={`absolute top-0 left-0 h-full ${player2AvgRounds < player1AvgRounds ? "bg-green-500" : "bg-red-500"}`}
                style={{
                  width: `${(player2AvgRounds / MAX_ROUNDS) * 100}%`,
                }}
              ></div>
              <span className="absolute left-2 top-4 text-white">{player2AvgRounds} Rounds</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for displaying individual stat items
const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-700">{label}</span>
    <span className="text-lg font-bold text-gray-800">{value}</span>
  </div>
);

export default Compare;
