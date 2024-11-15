import React from 'react';
import Navbar from './components/Navbar'; 
import { PlayerProvider } from './context/PlayerContext';
import Main from './components/Main';
import ExtraStats from './components/ExtraStats';

const App = () => {
  return (
    <div>
      <Navbar />
      <PlayerProvider>
        <Main/>
        <ExtraStats />
      </PlayerProvider>
    </div>
  );
};

export default App;