import React, { useEffect, useState } from 'react';
import { usePlayers } from '../context/PlayerContext';

const ExtraStats = () => {
    const { players, loading, error } = usePlayers();
    const [randomizedPlayers, setRandomizedPlayers] = useState([]);

    // Function to randomly pick two players from the list
    const getRandomPlayers = (players) => {
        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5); // Shuffle the players
        return shuffledPlayers.slice(0, 2); // Select the first two players
    };

    // Effect to randomize players when data is available
    useEffect(() => {
        if (players.length >= 2) {
            setRandomizedPlayers(getRandomPlayers(players));
        }
    }, [players]);

    const getRatingClass = (rating, player1Rating, player2Rating) => {
        const ratingValue = parseFloat(rating);
        if (ratingValue === player1Rating && ratingValue === player2Rating) return ''; // Same rating for both
        if (ratingValue < player1Rating || ratingValue < player2Rating) return 'text-red-500'; // Player with lower rating
        return 'text-green-500';  // Player with higher or same rating
    };

    const getKDDiffClass = (kddiff) => {
        const kdDiffValue = parseFloat(kddiff);
        if (kdDiffValue > 0) return 'text-green-500';
        if (kdDiffValue < 0) return 'text-red-500';
        return 'text-black'; // For zero or non-numeric values
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (randomizedPlayers.length < 2) {
        return <div>No players to compare</div>;
    }

    // Calculate comparison values
    const player1 = randomizedPlayers[0];
    const player2 = randomizedPlayers[1];

    const player1KD = parseFloat(player1?.kddiff || 0);
    const player2KD = parseFloat(player2?.kddiff || 0);

    // Calculate KD Diff percentage difference
    const percentageDiff = ((player2KD - player1KD) / Math.abs(player1KD)) * 100;

    // Normalize K/D Diff to percentage for filling progress bar
    const maxDiff = Math.max(Math.abs(player1KD), Math.abs(player2KD)); // Find the maximum absolute KD diff for full scale (100%)
    const player1BarWidth = (Math.abs(player1KD) / maxDiff) * 100;
    const player2BarWidth = (Math.abs(player2KD) / maxDiff) * 100;

    // Determine colors for the progress bars and text
    const player1BarColor = player1KD < player2KD ? 'bg-red-500' : 'bg-green-500';
    const player2BarColor = player2KD < player1KD ? 'bg-red-500' : 'bg-green-500';

    const player1TextClass = player1KD < player2KD ? 'text-red-500' : 'text-green-500';
    const player2TextClass = player2KD < player1KD ? 'text-red-500' : 'text-green-500';

    // Get the ratings for comparison
    const player1Rating = parseFloat(player1?.rating || 0);
    const player2Rating = parseFloat(player2?.rating || 0);

    return (
        <section className='w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-4 sm:p-8'>
            <h1 className='text-4xl font-semibold text-center mb-12 text-gray-800'>Recent Performances</h1>

            <div className='flex flex-col sm:flex-row justify-between space-y-8 sm:space-y-0 sm:space-x-12'>
                {/* Player 1 Comparison */}
                <div className='flex-1 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6 rounded-lg shadow-xl'>
                    <div className='flex items-center justify-center'>
                        <img className='w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md' src={player1.teamLogo} alt={player1.team} />
                    </div>
                    <h2 className='text-2xl font-semibold mt-6 text-center'>{player1.playerName}</h2>
                    <p className='text-center text-sm text-gray-600'>{player1.team}</p>

                    {/* KD Diff Progress Bar */}
                    <div className='mt-4'>
                        <p className='text-center text-sm font-medium text-gray-700'>K/D Diff</p>
                        <div className='relative mt-2'>
                            <div className='h-3 bg-gray-300 rounded-full'>
                                <div
                                    className={`h-3 rounded-full ${player1BarColor}`}
                                    style={{ width: `${player1BarWidth}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Displaying K/D Diff Number */}
                        <p className={`text-center ${player1TextClass} mt-2`}>
                            {player1.kddiff}
                        </p>
                    </div>

                    {/* Player Rating */}
                    <div className='mt-6'>
                        <p className='text-center text-sm font-medium text-gray-700'>Rating 1.0</p>
                        <div className='flex justify-center mt-2'>
                            <span className={`text-xl font-bold ${getRatingClass(player1.rating, player1Rating, player2Rating)}`}>{player1.rating}</span>
                        </div>
                    </div>
                </div>

                {/* KD Diff Center Comparison */}
                <div className='flex justify-center items-center flex-col p-6'>
                    <div className={`text-3xl font-semibold ${getKDDiffClass(percentageDiff)}`}>
                        {percentageDiff > 0 ? `+${percentageDiff.toFixed(2)}%` : `${percentageDiff.toFixed(2)}%`} K/D Diff
                    </div>
                    <p className='text-sm text-center text-gray-500 mt-2'>Compare the performance between the two players</p>
                </div>

                {/* Player 2 Comparison */}
                <div className='flex-1 bg-gradient-to-r from-green-50 via-green-100 to-green-200 p-6 rounded-lg shadow-xl'>
                    <div className='flex items-center justify-center'>
                        <img className='w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-md' src={player2.teamLogo} alt={player2.team} />
                    </div>
                    <h2 className='text-2xl font-semibold mt-6 text-center'>{player2.playerName}</h2>
                    <p className='text-center text-sm text-gray-600'>{player2.team}</p>

                    {/* KD Diff Progress Bar */}
                    <div className='mt-4'>
                        <p className='text-center text-sm font-medium text-gray-700'>K/D Diff</p>
                        <div className='relative mt-2'>
                            <div className='h-3 bg-gray-300 rounded-full'>
                                <div
                                    className={`h-3 rounded-full ${player2BarColor}`}
                                    style={{ width: `${player2BarWidth}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Displaying K/D Diff Number */}
                        <p className={`text-center ${player2TextClass} mt-2`}>
                            {player2.kddiff}
                        </p>
                    </div>

                    {/* Player Rating */}
                    <div className='mt-6'>
                        <p className='text-center text-sm font-medium text-gray-700'>Rating 1.0</p>
                        <div className='flex justify-center mt-2'>
                            <span className={`text-xl font-bold ${getRatingClass(player2.rating, player1Rating, player2Rating)}`}>{player2.rating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional Stats Table */}
            <div className='mt-12'>
                <h2 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Top Players by HLTV Rating 1.0</h2>
                <div className="overflow-x-auto">
                    <table className='min-w-full table-auto text-left'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='px-6 py-3 text-sm text-gray-600'>Player</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>Team</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>Maps</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>Rounds</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>K/D Diff</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>K/D</th>
                                <th className='px-6 py-3 text-sm text-gray-600'>Rating 1.0</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.slice(0, 50).map((player, index) => (
                                <tr key={index} className='border-t'>
                                    <td className='px-6 py-4'>{player.playerName}</td>
                                    <td className='px-6 py-4 w-5'><img src={player.teamLogo} alt="teamLogo" /></td>
                                    <td className='px-6 py-4'>{player.maps}</td>
                                    <td className='px-6 py-4'>{player.rounds}</td>
                                    <td className={`px-6 py-4 ${getKDDiffClass(player.kddiff)}`}>{player.kddiff}</td>
                                    <td className='px-6 py-4'>{player.kd}</td>
                                    <td className={`px-6 py-4 ${getRatingClass(player.rating)}`}>{player.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ExtraStats;