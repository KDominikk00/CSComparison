import { useMemo, useState } from 'react';
import { usePlayers } from '../context/PlayerContext';
import { formatNumber } from '../lib/format';
import Avatar from './Avatar';
import TeamLogo from './TeamLogo';
import { SearchIcon, SortIcon } from './icons';

const PAGE_SIZE = 50;

const COLUMNS = [
  { key: 'score', label: 'Score', className: '' },
  { key: 'killDeathRatio', label: 'K/D', className: '' },
  { key: 'killsPerRound', label: 'Kills/round', className: 'hidden md:table-cell' },
  { key: 'damagePerRound', label: 'Damage/round', className: 'hidden sm:table-cell' },
  { key: 'maps', label: 'Maps', className: 'hidden md:table-cell' },
];

const compareBy = (key, direction) => (a, b) => {
  const first = a[key] ?? -Infinity;
  const second = b[key] ?? -Infinity;
  return direction === 'desc' ? second - first : first - second;
};

const Leaderboard = ({ selection, onPick }) => {
  const { players } = usePlayers();
  const [sort, setSort] = useState({ key: 'score', direction: 'desc' });
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return players
      .filter((player) => player.score !== null)
      .filter((player) => player.nickname.toLowerCase().includes(needle) || player.team?.toLowerCase().includes(needle))
      .sort(compareBy(sort.key, sort.direction));
  }, [players, query, sort]);

  const topScore = useMemo(() => Math.max(...players.map((player) => player.score ?? 0), 1), [players]);

  const sortBy = (key) =>
    setSort((current) => ({ key, direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc' }));

  const sideOf = (slug) => (selection.a === slug ? 'a' : selection.b === slug ? 'b' : null);

  return (
    <section aria-labelledby="leaderboard-title" className="rounded-3xl border border-white/10 bg-ink-900/80 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="leaderboard-title" className="text-xl font-semibold text-slate-50">
            Top players
          </h2>
          <p className="mt-1 text-sm text-slate-400">Ranked by score over the last 15 matches. Tap a player to add them to the comparison.</p>
        </div>
        <label className="relative block sm:w-64">
          <span className="sr-only">Search players or teams</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search players or teams"
            className="h-10 w-full rounded-xl border border-white/10 bg-ink-800 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-side-a/60 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[22rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th scope="col" className="w-10 py-2 pr-2 font-medium">
                #
              </th>
              <th scope="col" className="py-2 pr-2 font-medium">
                Player
              </th>
              {COLUMNS.map(({ key, label, className }) => (
                <th key={key} scope="col" className={`py-2 pr-3 font-medium ${className}`} aria-sort={sort.key === key ? (sort.direction === 'desc' ? 'descending' : 'ascending') : 'none'}>
                  <button type="button" onClick={() => sortBy(key)} className="inline-flex items-center gap-1 uppercase tracking-wider transition-colors hover:text-slate-200">
                    {label}
                    <SortIcon direction={sort.key === key ? sort.direction : null} />
                  </button>
                </th>
              ))}
              <th scope="col" className="w-16 py-2 text-right font-medium">
                <span className="sr-only">Compare</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, visible).map((player, index) => {
              const side = sideOf(player.slug);
              return (
                <tr key={player.slug} className="border-t border-white/5 transition-colors hover:bg-white/3">
                  <td className="py-2.5 pr-2 tabular-nums text-slate-500">{index + 1}</td>
                  <td className="py-2.5 pr-2">
                    <div className="flex items-center gap-3">
                      <Avatar url={player.avatarUrl} className="h-9 w-9 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-100">{player.nickname}</p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-400">
                          <TeamLogo url={player.teamLogoUrl} className="h-3.5 w-3.5" />
                          <span className="truncate">{player.team ?? 'No team'}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 font-semibold tabular-nums text-slate-50">{formatNumber(player.score)}</span>
                      <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-ink-700 sm:block" aria-hidden="true">
                        <span className="block h-full rounded-full bg-slate-300" style={{ width: `${((player.score ?? 0) / topScore) * 100}%` }} />
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 tabular-nums text-slate-200">{formatNumber(player.killDeathRatio)}</td>
                  <td className="hidden py-2.5 pr-3 tabular-nums text-slate-200 md:table-cell">{formatNumber(player.killsPerRound)}</td>
                  <td className="hidden py-2.5 pr-3 tabular-nums text-slate-200 sm:table-cell">{formatNumber(player.damagePerRound)}</td>
                  <td className="hidden py-2.5 pr-3 tabular-nums text-slate-400 md:table-cell">{formatNumber(player.maps)}</td>
                  <td className="py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => onPick(player.slug)}
                      aria-pressed={side !== null}
                      aria-label={side ? `Remove ${player.nickname} from the comparison` : `Compare ${player.nickname}`}
                      className={`h-8 min-w-12 rounded-full border px-3 text-xs font-semibold transition-colors ${
                        side === 'a'
                          ? 'border-side-a/50 bg-side-a/15 text-side-a'
                          : side === 'b'
                            ? 'border-side-b/50 bg-side-b/15 text-side-b'
                            : 'border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {side ? side.toUpperCase() : 'Add'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="py-10 text-center text-sm text-slate-400">No players match your search.</p>}
      </div>

      {visible < rows.length && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-white/30 hover:text-white"
          >
            Show more ({rows.length - visible} left)
          </button>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
