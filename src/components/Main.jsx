import { useState } from 'react';
import PlayerSelector from './PlayerSelector';
import Compare from './Compare';
import Leaderboard from './Leaderboard';

const Main = () => {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);

  return (
    <>
      <main className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 p-4 mt-8 mb-12">
        <PlayerSelector selected={first} onSelect={setFirst} />
        <span className="text-xl text-white">VS</span>
        <PlayerSelector selected={second} onSelect={setSecond} />
      </main>

      {first && second ? <Compare first={first} second={second} /> : <Leaderboard />}
    </>
  );
};

export default Main;
