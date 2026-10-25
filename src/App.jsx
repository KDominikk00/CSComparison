import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import { PlayerProvider } from './context/PlayerContext';

const App = () => (
  <PlayerProvider>
    <Header />
    <Main />
    <Footer />
  </PlayerProvider>
);

export default App;
