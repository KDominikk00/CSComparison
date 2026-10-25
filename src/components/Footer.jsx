const links = [
  { href: 'https://github.com/KDominikk00/CSComparison', label: 'Website' },
  { href: 'https://github.com/KDominikk00/HLTVScraper', label: 'Scraper and API' },
];

const Footer = () => (
  <footer className="mt-20 border-t border-white/5">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="max-w-xl text-xs leading-relaxed">
        Player stats are collected from{' '}
        <a href="https://bo3.gg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-slate-200">
          bo3.gg
        </a>{' '}
        once a week. An unofficial fan project, not affiliated with bo3.gg or Valve.
      </p>
      <nav className="flex gap-5" aria-label="Source code">
        {links.map(({ href, label }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-100">
            {label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export default Footer;
