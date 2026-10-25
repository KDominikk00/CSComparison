import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { TONES } from '../lib/tones';
import Avatar from './Avatar';
import TeamLogo from './TeamLogo';
import { ChevronIcon, CloseIcon, SearchIcon } from './icons';

const MAX_VISIBLE = 50;

/** A searchable player dropdown with keyboard support (arrows, enter, escape). */
const PlayerPicker = ({ side, players, selected, takenSlug, onSelect, onClear }) => {
  const tone = TONES[side];
  const listId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return players
      .filter((player) => player.nickname.toLowerCase().includes(needle) || player.team?.toLowerCase().includes(needle))
      .sort((a, b) => a.nickname.localeCompare(b.nickname))
      .slice(0, MAX_VISIBLE);
  }, [players, query]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [open]);

  // Keep the highlighted option visible while moving through a long list with the arrow keys.
  useEffect(() => {
    if (open && matches[active]) {
      document.getElementById(`${listId}-${matches[active].slug}`)?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, active, matches, listId]);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActive(0);
  };

  const choose = (player) => {
    onSelect(player.slug);
    close();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, matches.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter' && matches[active]) {
      event.preventDefault();
      choose(matches[active]);
    } else if (event.key === 'Escape') {
      close();
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <div className={`flex items-center rounded-2xl border bg-ink-800/80 transition-colors ${selected ? tone.border : 'border-white/10'}`}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-3 text-left"
        >
          {selected ? <Avatar url={selected.avatarUrl} className="h-11 w-11 shrink-0" /> : <span className={`h-11 w-11 shrink-0 rounded-full ${tone.soft}`} aria-hidden="true" />}
          <span className="min-w-0 flex-1">
            <span className={`block text-[11px] font-semibold uppercase tracking-wider ${tone.text}`}>{tone.name}</span>
            <span className="block truncate text-base font-semibold text-slate-100">{selected ? selected.nickname : 'Choose a player'}</span>
          </span>
          {!selected && <ChevronIcon className="mr-1 h-5 w-5 shrink-0 text-slate-400" />}
        </button>
        {selected && (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Remove ${selected.nickname}`}
            className="mr-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-100"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-white/10 px-4">
            <SearchIcon className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              autoFocus
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={matches[active] ? `${listId}-${matches[active].slug}` : undefined}
              aria-label="Search players or teams"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search players or teams"
              className="h-12 w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <ul id={listId} role="listbox" aria-label="Players" className="max-h-72 overflow-y-auto p-1.5">
            {matches.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-400">No players found</li>}
            {matches.map((player, index) => {
              const taken = player.slug === takenSlug;
              return (
                <li
                  key={player.slug}
                  id={`${listId}-${player.slug}`}
                  role="option"
                  aria-selected={player.slug === selected?.slug}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(player)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${index === active ? 'bg-white/8' : ''}`}
                >
                  <Avatar url={player.avatarUrl} className="h-8 w-8 shrink-0" />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-100">{player.nickname}</span>
                  {taken && <span className="shrink-0 text-[11px] text-slate-500">other side</span>}
                  <TeamLogo url={player.teamLogoUrl} className="h-5 w-5 shrink-0" />
                  <span className="hidden w-28 shrink-0 truncate text-xs text-slate-400 sm:block">{player.team}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlayerPicker;
