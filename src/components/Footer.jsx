const Footer = () => (
  <footer className="w-full bg-gray-800 text-white py-8 mt-8">
    <div className="max-w-7xl m-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">CSComparison</h2>
          <p className="text-sm text-gray-400 mt-2">&copy; {new Date().getFullYear()} CSComparison.</p>
          <p className="text-xs text-gray-400 mt-2 max-w-md">
            Player stats are collected from{' '}
            <a href="https://bo3.gg" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              bo3.gg
            </a>{' '}
            and refreshed once a day. This site is an unofficial fan project and is not affiliated with bo3.gg or Valve.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a
            href="https://github.com/KDominikk00"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
          >
            GitHub
          </a>
          <a
            href="https://github.com/KDominikk00/HLTVScraper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
          >
            Custom Web Scraper
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
