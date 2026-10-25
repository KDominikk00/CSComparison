/** Placeholder blocks shown while stats load. */
const Skeleton = () => (
  <div className="space-y-6 animate-pulse" role="status" aria-label="Loading stats">
    <div className="h-72 rounded-3xl border border-white/5 bg-ink-900/80" />
    <div className="h-64 rounded-3xl border border-white/5 bg-ink-900/80" />
    <div className="h-64 rounded-3xl border border-white/5 bg-ink-900/80" />
  </div>
);

export default Skeleton;
