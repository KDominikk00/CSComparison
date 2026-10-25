/** A player photo, or a plain circle for players bo3.gg has no photo of. */
const Avatar = ({ url, className = '' }) =>
  url?.startsWith('http') ? (
    <img src={url} alt="" loading="lazy" className={`${className} rounded-full bg-ink-700 object-cover`} />
  ) : (
    <div className={`${className} rounded-full bg-ink-700`} aria-hidden="true" />
  );

export default Avatar;
