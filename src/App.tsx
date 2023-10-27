import './App.css';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AboutUs } from './components/AboutUs';
import { Statistic } from './components/Statistic';
import { Announcement } from './components/Announcement';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <main className="main">
        <AboutUs />
        <Statistic />
        <Announcement />
      </main>
      <Footer />
    </>

  );
}

export default App;
