const TeamLogo = ({ url, className = 'h-5 w-5' }) =>
  url?.startsWith('http') ? <img src={url} alt="" loading="lazy" className={`${className} object-contain`} /> : <span className={className} aria-hidden="true" />;

export default TeamLogo;
