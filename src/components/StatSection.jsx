import { barFractions, winner } from '../lib/compare';
import { formatNumber } from '../lib/format';

const Side = ({ side, value, unit, fraction, result, neutral }) => {
  const isWinner = result === side;
  const barColor = side === 'a' ? 'bg-side-a' : 'bg-side-b';
  const textColor = side === 'a' ? 'text-side-a' : 'text-side-b';
  const align = side === 'a' ? 'flex-row-reverse' : 'flex-row';
  const barAlign = side === 'a' ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${align}`}>
      <span className={`w-12 shrink-0 text-sm tabular-nums sm:w-16 sm:text-base ${side === 'a' ? 'text-right' : 'text-left'} ${isWinner ? `font-bold ${textColor}` : result || neutral ? 'text-slate-400' : 'text-slate-200'}`}>
        {formatNumber(value, unit)}
      </span>
      <div className={`flex h-2 min-w-0 flex-1 rounded-full bg-ink-700 ${barAlign}`} aria-hidden="true">
        <div className={`h-full rounded-full ${barColor} ${isWinner || (!result && !neutral) ? 'opacity-100' : 'opacity-45'}`} style={{ width: `${fraction * 100}%` }} />
      </div>
    </div>
  );
};

/** One block of the comparison: rows of mirrored bars, player A growing left and player B growing right. */
const StatSection = ({ section, names }) => (
  <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-32 rounded-3xl border border-white/10 bg-ink-900/80 p-4 sm:p-6">
    <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4">
      <h2 id={`${section.id}-title`} className="text-lg font-semibold text-slate-50">
        {section.title}
      </h2>
      <p className="text-xs text-slate-500">{section.subtitle}</p>
    </header>
    <ul>
      {section.rows.map(({ label, a, b, unit, better }) => {
        const result = winner(a, b, better);
        const [fractionA, fractionB] = barFractions(a, b);
        const neutral = !better;
        return (
          <li key={label} className="grid grid-cols-[1fr_5.5rem_1fr] items-center gap-2 border-t border-white/5 py-2.5 first:border-t-0 sm:grid-cols-[1fr_11rem_1fr] sm:gap-4">
            <Side side="a" value={a} unit={unit} fraction={fractionA} result={result} neutral={neutral} />
            <span className="text-center text-[11px] leading-tight text-slate-400 sm:text-sm">
              {label}
              <span className="sr-only">
                : {names[0]} {formatNumber(a, unit)}, {names[1]} {formatNumber(b, unit)}
                {result ? `, ${names[result === 'a' ? 0 : 1]} is better` : ''}
              </span>
            </span>
            <Side side="b" value={b} unit={unit} fraction={fractionB} result={result} neutral={neutral} />
          </li>
        );
      })}
    </ul>
  </section>
);

export default StatSection;
