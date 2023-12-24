import './App.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation />
        <Outlet />
      <Footer />
    </>
  );
}

export default App;
