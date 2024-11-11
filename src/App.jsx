import React from 'react';
import Navbar from './components/Navbar'; 
import Main from './components/Main';
import ExtraStats from './components/ExtraStats';

const App = () => {
  return (
    <div>
      <Navbar />
      <Main/>
      <ExtraStats />
    </div>
  );
};

export default App;