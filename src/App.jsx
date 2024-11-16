import React from 'react';
import Navbar from './components/Navbar'; 
import { PlayerProvider } from './context/PlayerContext';
import Main from './components/Main';

const App = () => {
  return (
    <div>
      <Navbar />
      <PlayerProvider>
        <Main />
      </PlayerProvider>
    </div>
  );
};

export default App;