import React from "react";

const Compare = ({ player1, player2 }) => {
  const player1AvgRounds = (player1.rounds / player1.maps).toFixed(1);
  const player2AvgRounds = (player2.rounds / player2.maps).toFixed(1);

  const MAX_ROUNDS = 30;

  return (
    <div>
      <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8 pb-12">
        <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">Player Comparison</h1>
        <div className="flex justify-around items-center">
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

          <div className="flex flex-col items-center space-y-2">
            <p className="text-3xl font-semibold text-gray-700">Vs</p>
          </div>

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

      <section className="w-full max-w-7xl bg-gray-50 m-auto rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Average Rounds Per Match
        </h2>
        <div className="flex flex-col items-start space-y-8">
          <p className="text-lg text-gray-500 mb-4">
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

      <section className="w-full max-w-7xl bg-gray-50 m-auto rounded-lg shadow-lg p-8 mt-8">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
    K/D Ratio Explained
  </h2>
  <div className="flex flex-col items-start space-y-8">
    <p className="text-lg text-gray-500">
      The <strong>K/D ratio</strong> measures a player's average kills per death. It is calculated by dividing the total kills by total deaths. A ratio greater than 1.00 indicates more kills than deaths, showcasing strong performance.
    </p>
    <div className="flex flex-col items-center w-full space-y-4">
      <div className="flex flex-col items-center space-y-4 w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex justify-center items-center">
              <span className="text-white text-xs"><img src="/kill.png" alt="Kill icon" /></span> {/* Crosshair icon for kills */}
            </div>
            <span className="text-gray-700">Kills</span>
          </div>
          <span className="text-gray-600">70%</span>
        </div>
        <div className="w-full h-6 bg-gray-200 rounded-lg">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-700 rounded-lg"
            style={{ width: "70%" }}
          ></div>
        </div>

        <div className="w-full flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex justify-center items-center">
              <span className="text-white text-xs"><img className="w-3 h-3" src="/skull.png" alt="" /></span> {/* Skull icon for deaths */}
            </div>
            <span className="text-gray-700">Deaths</span>
          </div>
          <span className="text-gray-600">30%</span> 
        </div>
        <div className="w-full h-6 bg-gray-200 rounded-lg">
          <div
            className="h-full bg-gradient-to-r from-red-400 to-red-700 rounded-lg"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>
      
      <p className="text-md text-gray-500 text-center mt-4">
        This visualization shows that for every 10 rounds, a player averages <strong>7 kills</strong> and <strong>3 deaths</strong>, resulting in a K/D of <strong>2.33</strong>
      </p>
    </div>
  </div>
</section>

<section className="w-full max-w-7xl bg-gray-50 m-auto rounded-lg shadow-lg p-8 mt-8">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
    Understanding HLTV Rating 1.0
  </h2>
  <div className="flex flex-col items-start space-y-8">
    <p className="text-lg text-gray-500">
      HLTV Rating 1.0 reflects player performance based on <strong>kills per round</strong>, <strong>survival rate</strong>, and <strong>impact rating</strong>. A higher rating indicates a better overall performance.
    </p>
    <div className="flex justify-around w-full mt-6">
      <div className="w-1/3 flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="5" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#34D399"
              strokeWidth="5"
              fill="none"
              strokeDasharray="282.743"
              strokeDashoffset={282.743 - (282.743 * 0.4)}
            />
            <text x="50%" y="50%" textAnchor="middle" fill="#34D399" fontSize="16" fontWeight="bold" dy="6">
              40%
            </text>
          </svg>
        </div>
        <p className="text-md text-gray-600 mt-2">
          <strong>Kills/round</strong> contribute <span className="text-green-500">40%</span>
        </p>
      </div>

      {/* Survival */}
      <div className="w-1/3 flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="5" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#3B82F6"
              strokeWidth="5"
              fill="none"
              strokeDasharray="282.743"
              strokeDashoffset={282.743 - (282.743 * 0.3)} 
            />
            <text x="50%" y="50%" textAnchor="middle" fill="#3B82F6" fontSize="16" fontWeight="bold" dy="6">
              30%
            </text>
          </svg>
        </div>
        <p className="text-md text-gray-600 mt-2">
          <strong>Survival</strong> contributes <span className="text-blue-500">30%</span>
        </p>
      </div>

      <div className="w-1/3 flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="5" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#FB923C"
              strokeWidth="5"
              fill="none"
              strokeDasharray="282.743"
              strokeDashoffset={282.743 - (282.743 * 0.3)} 
            />
            <text x="50%" y="50%" textAnchor="middle" fill="#FB923C" fontSize="16" fontWeight="bold" dy="6">
              30%
            </text>
          </svg>
        </div>
        <p className="text-md text-gray-600 mt-2">
          <strong>Impact</strong> contributes <span className="text-orange-500">30%</span>
        </p>
      </div>
    </div>

    <p className="text-md text-gray-500 text-center mt-6">
      The HLTV Rating is a weighted combination of these metrics. Players with consistent high kills, high survival rates, and strong impact performances achieve higher ratings.
    </p>
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
