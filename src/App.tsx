import React from 'react';
import './App.css';
import { Header } from './components/Header';

function App() {
  (() => {
    console.log('webpack works')
  })();

  return (
    <>
      <Header />
      <main></main>
      <footer></footer>
    </>

  );
}

export default App;
