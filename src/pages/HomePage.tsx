import React, { useState } from 'react';
import { Header } from '../components/Header';
import { AboutUs } from '../components/AboutUs';
import { Statistic } from '../components/Statistic';
import { Announcement } from '../components/Announcement';

export const HomePage: React.FC = () => {

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
