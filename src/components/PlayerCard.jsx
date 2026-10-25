const PlayerCard = ({ player, tone }) => (
  <div className={`flex-1 p-4 rounded-lg shadow-xl max-w-xs mx-auto bg-gradient-to-r ${tone}`}>
    <img src={player.avatarUrl} alt="" className="w-24 h-24 rounded-full object-cover mx-auto bg-white" />
    <h2 className="text-2xl font-semibold mt-4 text-center">{player.nickname}</h2>
    <div className="flex items-center justify-center gap-2 mt-1 text-sm text-gray-600">
      <img src={player.teamLogoUrl} alt="" className="w-5 h-5 object-contain" />
      <span>{player.team ?? 'No team'}</span>
    </div>
    <p className="text-center text-xs text-gray-500 mt-1">{player.country}</p>
  </div>
);

export default PlayerCard;
