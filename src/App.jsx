import React from 'react';
import Navbar from './components/Navbar'; 
import { PlayerProvider } from './context/PlayerContext';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <PlayerProvider>
        <Main />
      </PlayerProvider>
      <Footer />
    </div>
  );
};

export default App;