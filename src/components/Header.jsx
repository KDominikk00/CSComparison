import { usePlayers } from '../context/PlayerContext';
import { formatDate } from '../lib/format';

const Header = () => {
  const { fetchedAt } = usePlayers();
  const updated = formatDate(fetchedAt);

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={import.meta.env.BASE_URL} className="flex items-center" aria-label="CSComparison home">
          <img src="/CSComparison.png" alt="CSComparison" className="h-8 w-auto" />
        </a>
        <p className="text-xs text-slate-400">
          Stats from{' '}
          <a href="https://bo3.gg" target="_blank" rel="noopener noreferrer" className="font-medium text-slate-200 underline-offset-4 hover:underline">
            bo3.gg
          </a>
          {updated && <span className="hidden sm:inline"> · updated {updated}</span>}
        </p>
      </div>
    </header>
  );
};

export default Header;
