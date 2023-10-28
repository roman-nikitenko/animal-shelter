import React from 'react';
import { Header } from '../components/Header';
import { AboutUs } from '../components/AboutUs';
import { Statistic } from '../components/Statistic';
import { Announcement } from '../components/Announcement';

export const HomePage: React.FC = () => {

  // useEffect(() => {
  //   fetch('https://happy-paws-pqwx.onrender.com/api/pets/statistic/')
  //     .then(response => {
  //       console.log(response);
  //     })
  // }, [])

  return (
    <>
      <Header />
      <main className="main">
        <AboutUs />
        <Statistic />
        <Announcement />
      </main>
    </>
  );
};
