// Stats where a smaller number is the better one. Everything else is higher-is-better unless listed as neutral.
const LOWER_IS_BETTER = new Set(['Death', 'Open death']);
const NEUTRAL = new Set(['Kill cost', '100dmg cost', 'Saved', 'Shots']);

export const betterFor = (name) => {
  if (NEUTRAL.has(name)) return undefined;
  return LOWER_IS_BETTER.has(name) ? 'low' : 'high';
};

/** Which side wins a row: 'a', 'b', or null when it is a tie, a neutral stat or a value is missing. */
export const winner = (a, b, better) => {
  if (!better || typeof a !== 'number' || typeof b !== 'number' || a === b) {
    return null;
  }
  const firstWins = better === 'high' ? a > b : a < b;
  return firstWins ? 'a' : 'b';
};

/** Bar lengths from 0 to 1, each relative to the larger of the two values. */
export const barFractions = (a, b) => {
  const first = typeof a === 'number' && a > 0 ? a : 0;
  const second = typeof b === 'number' && b > 0 ? b : 0;
  const largest = Math.max(first, second);
  return largest === 0 ? [0, 0] : [first / largest, second / largest];
};

const round1 = (value) => Math.round(value * 10) / 10;

const averageRounds = (player) =>
  player.totals.maps?.count ? round1(player.totals.rounds.count / player.totals.maps.count) : null;

const overviewRows = (a, b) => [
  { label: 'Score', a: a.score, b: b.score, better: 'high' },
  { label: 'K/D', a: a.killDeathRatio, b: b.killDeathRatio, better: 'high' },
  { label: 'Kills per round', a: a.killsPerRound, b: b.killsPerRound, better: 'high' },
  { label: 'Deaths per round', a: a.deathsPerRound, b: b.deathsPerRound, better: 'low' },
  { label: 'Damage per round', a: a.damagePerRound, b: b.damagePerRound, better: 'high' },
];

const resultRows = (a, b) => [
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

export const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Every block of the comparison page, in order, built from two players' full stats. */
export const buildSections = (a, b) => {
  const categoryNames = [...new Set([...a.categories, ...b.categories].map((category) => category.name))];

  return [
    { id: 'overview', title: 'Overview', subtitle: 'Last 15 matches, per round', rows: overviewRows(a, b) },
    { id: 'results', title: 'Results', subtitle: 'Last 6 months', rows: resultRows(a, b) },
    ...categoryNames.map((name) => ({
      id: slugify(name),
      title: name,
      subtitle: 'Last 15 matches, per round unless stated',
      rows: categoryRows(a, b, name),
    })),
    { id: 'accuracy', title: 'Where the shots land', subtitle: 'Share of hits, last 6 months', rows: accuracyRows(a, b) },
    { id: 'maps', title: 'Score per map', subtitle: 'Last 6 months', rows: mapRows(a, b) },
  ].filter((section) => section.rows.length > 0);
};

/** How many rows each side wins across all sections. */
export const tally = (sections) => {
  const wins = { a: 0, b: 0 };
  for (const section of sections) {
    for (const row of section.rows) {
      const side = winner(row.a, row.b, row.better);
      if (side) wins[side] += 1;
    }
  }
  return wins;
};
