import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

const ExtraStats = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPlayerData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchData("http://localhost:8080/api/hltv/players");
                setPlayers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadPlayerData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getRatingClass = (rating) => {
        return parseFloat(rating) > 1.0 ? 'text-green-500' : 'text-black';
    };

    const getKDDiffClass = (kddiff) => {
      const kdDiffValue = parseFloat(kddiff);
      if (kdDiffValue > 0) return 'text-green-500';
      if (kdDiffValue < 0) return 'text-red-500';
      return 'text-black'; // For zero or non-numeric values
  };

    return (
        <section className='w-11/12 bg-white m-auto rounded-md'>
            <div>
                <h1 className='text-4xl pt-6 mb-10 pl-10'>Recent Performances</h1>
                <div className='flex justify-between w-5/6 m-auto'>
                    <div>
                        <img className='w-40' src="/vitality.png" alt="Vitality" />
                        <h2 className='text-2xl text-center'>Zywoo</h2>
                    </div>
                    <div>
                        <img className='w-40' src="/vitality.png" alt="Vitality" />
                        <h2 className='text-2xl text-center'>Zywoo</h2>
                    </div>
                </div>
                <img className='m-auto mt-10' src="/bar.png" alt="bar" />
            </div>

            <div>
                <h1 className='text-4xl pt-6 mb-10 pl-10'>Top Players by K/D Ratio</h1>
                <table className='m-auto border-2 border-black w-11/12 mb-10'>
                    <thead>
                        <tr className='border-2 border-black'>
                            <th>Player</th>
                            <th>Teams</th>
                            <th>Maps</th>
                            <th>Rounds</th>
                            <th>K-D Diff</th>
                            <th>K/D</th>
                            <th>Rating <br /> 1.0</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.slice(0, 100).map((player, index) => (
                            <tr>
                                <td>{player.playerName}</td>
                                <td><img src={player.teamLogo} alt={player.team} width="18" height="18" /></td>
                                <td>{player.maps}</td>
                                <td>{player.rounds}</td>
                                <td className={getKDDiffClass(player.kddiff)}>{player.kddiff}</td>
                                <td>{player.kd}</td>
                                <td className={getRatingClass(player.rating)}>{player.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ExtraStats;