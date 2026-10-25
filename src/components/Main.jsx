import { usePlayers } from '../context/PlayerContext';
import { useSelection } from '../hooks/useSelection';
import Compare from './Compare';
import Leaderboard from './Leaderboard';
import { Loading, LoadError } from './LoadState';
import Pickers from './Pickers';

const Main = () => {
  const { players, loading, error, reload } = usePlayers();
  const { selection, setSide, swap, clear, toggle } = useSelection();

  // Slugs in the address bar that are not in the data are ignored.
  const find = (slug) => players.find((player) => player.slug === slug) ?? null;
  const selected = { a: find(selection.a), b: find(selection.b) };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      {!(selected.a && selected.b) && (
        <div className="pb-10 pt-12 text-center sm:pt-16">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">Who is actually better?</h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-slate-400">
            Put any two professional Counter-Strike 2 players head to head: score, K/D, damage, aim, grenades, economy and every map.
          </p>
        </div>
      )}

      {selected.a && selected.b && <div className="pt-8" />}

      {loading ? (
        <Loading />
      ) : error ? (
        <LoadError message={error} onRetry={reload} />
      ) : (
        <div className="space-y-8">
          <Pickers
            players={players}
            selected={selected}
            selection={selection}
            onSelect={setSide}
            onClear={(side) => setSide(side, null)}
            onSwap={swap}
            onReset={clear}
          />
          {selected.a && selected.b ? <Compare first={selected.a} second={selected.b} key={`${selected.a.slug}-${selected.b.slug}`} /> : <Leaderboard selection={selection} onPick={toggle} />}
        </div>
      )}
    </main>
  );
};

export default Main;
