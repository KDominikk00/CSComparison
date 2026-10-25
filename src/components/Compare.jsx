import { useMemo } from 'react';
import { usePlayer } from '../hooks/usePlayer';
import { buildSections, tally } from '../lib/compare';
import HeadToHead from './HeadToHead';
import SectionNav from './SectionNav';
import StatSection from './StatSection';
import Skeleton from './Skeleton';

const Compare = ({ first, second }) => {
  const one = usePlayer(first.slug);
  const two = usePlayer(second.slug);

  const a = one.player;
  const b = two.player;
  const error = one.error ?? two.error;

  const sections = useMemo(() => (a && b ? buildSections(a, b) : []), [a, b]);
  const wins = useMemo(() => tally(sections), [sections]);

  if (error) {
    return (
      <p role="alert" className="rounded-3xl border border-red-400/30 bg-red-400/10 p-6 text-center text-red-200">
        {error}
      </p>
    );
  }

  if (!a || !b) {
    return <Skeleton />;
  }

  return (
    <div className="space-y-6">
      <HeadToHead a={a} b={b} wins={wins} />
      <SectionNav sections={sections} />
      {sections.map((section) => (
        <StatSection key={section.id} section={section} names={[a.nickname, b.nickname]} />
      ))}
    </div>
  );
};

export default Compare;
