import { useState } from 'react';
import { usePlayers } from '../context/PlayerContext';
import Avatar from './Avatar';
import { formatNumber } from '../lib/format';

const PAGE_SIZE = 50;

const Leaderboard = () => {
  const { players, fetchedAt, loading, error } = usePlayers();
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (loading || error) {
    return null;
  }

  const ranked = players.filter((player) => player.score !== null).sort((a, b) => b.score - a.score);

  return (
    <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Top Players by Score</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Pick two players above to compare them.
        {fetchedAt && ` Stats updated ${new Date(fetchedAt).toLocaleDateString()}.`}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">K/D</th>
              <th className="px-4 py-3">Kills/round</th>
              <th className="px-4 py-3">Damage/round</th>
              <th className="px-4 py-3">Maps</th>
            </tr>
          </thead>
          <tbody>
            {ranked.slice(0, visible).map((player, index) => (
              <tr key={player.slug} className="border-t">
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar url={player.avatarUrl} className="w-8 h-8 rounded-full" />
                    <span className="font-medium">{player.nickname}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={player.teamLogoUrl} alt="" className="w-6 h-6 object-contain" />
                    <span className="text-sm text-gray-600">{player.team}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold">{formatNumber(player.score)}</td>
                <td className="px-4 py-3">{formatNumber(player.killDeathRatio)}</td>
                <td className="px-4 py-3">{formatNumber(player.killsPerRound)}</td>
                <td className="px-4 py-3">{formatNumber(player.damagePerRound)}</td>
                <td className="px-4 py-3">{formatNumber(player.maps)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visible < ranked.length && (
        <div className="text-center mt-6">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
