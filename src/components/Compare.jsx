import { usePlayer } from '../hooks/usePlayer';
import PlayerCard from './PlayerCard';
import StatTable from './StatTable';

const BLUE = 'from-blue-50 via-blue-100 to-blue-200';
const RED = 'from-red-50 via-red-100 to-red-200';

// Stats where a smaller number is the better one. Other stats are higher-is-better unless listed as neutral.
const LOWER_IS_BETTER = new Set(['Death', 'Open death']);
const NEUTRAL = new Set(['Kill cost', '100dmg cost', 'Saved', 'Shots']);

const betterFor = (name) => {
  if (NEUTRAL.has(name)) return undefined;
  return LOWER_IS_BETTER.has(name) ? 'low' : 'high';
};

const averageRounds = (player) =>
  player.totals.maps?.count ? Math.round((player.totals.rounds.count / player.totals.maps.count) * 10) / 10 : null;

const overviewRows = (a, b) => [
  { label: 'Score', a: a.score, b: b.score, better: 'high' },
  { label: 'K/D', a: a.killDeathRatio, b: b.killDeathRatio, better: 'high' },
  { label: 'Kills per round', a: a.killsPerRound, b: b.killsPerRound, better: 'high' },
  { label: 'Deaths per round', a: a.deathsPerRound, b: b.deathsPerRound, better: 'low' },
  { label: 'Damage per round', a: a.damagePerRound, b: b.damagePerRound, better: 'high' },
];

const totalsRows = (a, b) => [
  { label: 'Tournaments', a: a.totals.tournaments?.count, b: b.totals.tournaments?.count },
  { label: 'Matches', a: a.totals.matches?.count, b: b.totals.matches?.count },
  { label: 'Match win rate', a: a.totals.matches?.winRate, b: b.totals.matches?.winRate, unit: '%', better: 'high' },
  { label: 'Maps', a: a.totals.maps?.count, b: b.totals.maps?.count },
  { label: 'Map win rate', a: a.totals.maps?.winRate, b: b.totals.maps?.winRate, unit: '%', better: 'high' },
  { label: 'Rounds', a: a.totals.rounds?.count, b: b.totals.rounds?.count },
  { label: 'Round win rate', a: a.totals.rounds?.winRate, b: b.totals.rounds?.winRate, unit: '%', better: 'high' },
  { label: 'Average rounds per map', a: averageRounds(a), b: averageRounds(b) },
];

const categoryRows = (a, b, categoryName) => {
  const lookup = (player) =>
    new Map((player.categories.find((category) => category.name === categoryName)?.stats ?? []).map((stat) => [stat.name, stat]));
  const first = lookup(a);
  const second = lookup(b);
  const names = [...new Set([...first.keys(), ...second.keys()])];

  return names.map((name) => ({
    label: name,
    a: first.get(name)?.value,
    b: second.get(name)?.value,
    unit: first.get(name)?.unit ?? second.get(name)?.unit,
    better: betterFor(name),
  }));
};

const accuracyRows = (a, b) => {
  const share = (player, bodyPart) => player.accuracy.find((entry) => entry.bodyPart === bodyPart)?.share;
  const bodyParts = [...new Set([...a.accuracy, ...b.accuracy].map((entry) => entry.bodyPart))];
  return bodyParts.map((bodyPart) => ({ label: bodyPart, a: share(a, bodyPart), b: share(b, bodyPart), unit: '%' }));
};

const mapRows = (a, b) => {
  const score = (player, map) => player.mapStats.find((entry) => entry.map === map)?.score;
  const maps = [...new Set([...a.mapStats, ...b.mapStats].map((entry) => entry.map))];
  return maps.map((map) => ({ label: map, a: score(a, map), b: score(b, map), better: 'high' }));
};

const Compare = ({ first, second }) => {
  const one = usePlayer(first.slug);
  const two = usePlayer(second.slug);

  const error = one.error ?? two.error;
  const ready = one.player && two.player;
  const a = one.player;
  const b = two.player;

  const categoryNames = ready
    ? [...new Set([...a.categories, ...b.categories].map((category) => category.name))]
    : [];

  return (
    <div className="px-4">
      <section className="w-full max-w-7xl bg-white m-auto rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">Player Comparison</h1>
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          <PlayerCard player={a ?? first} tone={BLUE} />
          <p className="text-3xl font-semibold text-gray-700">Vs</p>
          <PlayerCard player={b ?? second} tone={RED} />
        </div>
        {error && <p className="text-center text-red-600 mt-6">{error}</p>}
        {!error && !ready && <p className="text-center text-gray-500 mt-6">Loading stats...</p>}
      </section>

      {ready && (
        <>
          <StatTable title="Overview" subtitle="Last 15 matches, per round" names={[a.nickname, b.nickname]} rows={overviewRows(a, b)} />
          <StatTable title="Results" subtitle="Last 6 months" names={[a.nickname, b.nickname]} rows={totalsRows(a, b)} />
          {categoryNames.map((name) => (
            <StatTable
              key={name}
              title={name}
              subtitle="Last 15 matches, per round unless stated"
              names={[a.nickname, b.nickname]}
              rows={categoryRows(a, b, name)}
            />
          ))}
          <StatTable title="Where the shots land" subtitle="Share of hits, last 6 months" names={[a.nickname, b.nickname]} rows={accuracyRows(a, b)} />
          <StatTable title="Score per map" subtitle="Last 6 months" names={[a.nickname, b.nickname]} rows={mapRows(a, b)} />
        </>
      )}
    </div>
  );
};

export default Compare;
