import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { AboutUs } from './components/AboutUs';

function App() {
  return (
    <>
      <Navigation />
      <Header />
      <main className="main">
        <AboutUs />
      </main>
      <footer></footer>
    </>

  );
}

export default App;
