/** A player photo, or a plain circle for players bo3.gg has no photo of. */
const Avatar = ({ url, className }) =>
  url?.startsWith('http') ? (
    <img src={url} alt="" className={`${className} object-cover`} />
  ) : (
    <div className={`${className} bg-gray-200`} aria-hidden="true" />
  );

export default Avatar;
