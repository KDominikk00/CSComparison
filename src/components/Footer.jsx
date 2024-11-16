import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-7xl m-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-semibold">CSComparison</h2>
            <p className="text-sm text-gray-400 mt-2">© 2024 CSComparison.</p>
            <p className="text-xs text-gray-400 mt-2 w-2/3">All web scraping activities conducted by CSComparison are fully compliant with HLTV’s Terms and Conditions. We respect the site’s policies and utilize scraping methods that are in line with their usage guidelines.</p>
          </div>

          {/* Right Section: Links */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* GitHub Link */}
            <a
              href="https://github.com/KDominikk00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              GitHub
            </a>

            {/* Web Scraper Link */}
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
};

export default Footer;