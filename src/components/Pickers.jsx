import PlayerPicker from './PlayerPicker';
import { SwapIcon } from './icons';

const Pickers = ({ players, selected, selection, onSelect, onClear, onSwap, onReset }) => (
  <div>
    <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
      <PlayerPicker side="a" players={players} selected={selected.a} takenSlug={selection.b} onSelect={(slug) => onSelect('a', slug)} onClear={() => onClear('a')} />
      <button
        type="button"
        onClick={onSwap}
        disabled={!selection.a && !selection.b}
        aria-label="Swap players"
        className="mx-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-ink-800 text-slate-300 transition-colors hover:text-white disabled:opacity-40"
      >
        <SwapIcon className="h-4 w-4 rotate-90 md:rotate-0" />
      </button>
      <PlayerPicker side="b" players={players} selected={selected.b} takenSlug={selection.a} onSelect={(slug) => onSelect('b', slug)} onClear={() => onClear('b')} />
    </div>
    {(selection.a || selection.b) && (
      <div className="mt-3 text-center">
        <button type="button" onClick={onReset} className="text-xs text-slate-400 underline-offset-4 transition-colors hover:text-slate-100 hover:underline">
          Reset
        </button>
      </div>
    )}
  </div>
);

export default Pickers;
