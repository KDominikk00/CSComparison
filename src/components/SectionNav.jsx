/** Sticky row of links that jump to each block of the comparison. */
const SectionNav = ({ sections }) => (
  <nav aria-label="Comparison sections" className="sticky top-16 z-30 -mx-4 border-b border-white/5 bg-ink-950/80 backdrop-blur-md sm:-mx-6">
    <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
      {sections.map((section) => (
        <li key={section.id} className="shrink-0">
          <a href={`#${section.id}`} className="block rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-slate-300 transition-colors hover:border-white/30 hover:text-white">
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default SectionNav;
