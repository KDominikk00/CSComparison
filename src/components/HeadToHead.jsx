import { TONES } from '../lib/tones';
import { formatNumber } from '../lib/format';
import Avatar from './Avatar';
import TeamLogo from './TeamLogo';

const Fighter = ({ side, player }) => {
  const tone = TONES[side];
  const alignment = side === 'a' ? 'items-center text-center md:items-end md:text-right' : 'items-center text-center md:items-start md:text-left';

  return (
    <div className={`flex min-w-0 flex-col gap-3 ${alignment}`}>
      <Avatar url={player.avatarUrl} className={`h-20 w-20 ring-4 ${tone.ring} sm:h-28 sm:w-28`} />
      <div className="min-w-0 max-w-full">
        <h2 className="truncate text-xl font-bold text-slate-50 sm:text-3xl">{player.nickname}</h2>
        <p className={`mt-1 flex items-center gap-2 text-sm text-slate-300 ${side === 'a' ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
          <TeamLogo url={player.teamLogoUrl} className="h-5 w-5" />
          <span className="truncate">{player.team ?? 'No team'}</span>
        </p>
        <p className="mt-0.5 text-xs text-slate-500">{player.country}</p>
      </div>
      <p className={`text-4xl font-extrabold tabular-nums sm:text-6xl ${tone.text}`}>
        {formatNumber(player.score)}
        <span className="ml-1.5 align-middle text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:ml-2 sm:text-xs">score</span>
      </p>
    </div>
  );
};

/** The two players facing each other, with how many stats each of them wins. */
const HeadToHead = ({ a, b, wins }) => {
  const total = wins.a + wins.b;
  const share = total === 0 ? 50 : (wins.a / total) * 100;

  return (
    <section aria-label="Head to head" className="rounded-3xl border border-white/10 bg-ink-900/80 p-5 sm:p-8">
      <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
        <Fighter side="a" player={a} />
        <div className="hidden text-center md:block" aria-hidden="true">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">vs</p>
        </div>
        <Fighter side="b" player={b} />
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold tabular-nums text-side-a">{wins.a}</span>
          <span className="text-xs uppercase tracking-wider text-slate-500">stats won</span>
          <span className="font-semibold tabular-nums text-side-b">{wins.b}</span>
        </div>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-ink-700" role="img" aria-label={`${a.nickname} wins ${wins.a} stats, ${b.nickname} wins ${wins.b}`}>
          <div className="h-full bg-side-a" style={{ width: `${share}%` }} />
          <div className="h-full flex-1 bg-side-b" />
        </div>
      </div>
    </section>
  );
};

export default HeadToHead;
