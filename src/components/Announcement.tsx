import React from 'react';
import { Carousel } from './corusel/Carousel';

export const Announcement: React.FC = () => {
  return (
    <section className="announcement">
      <h3 className="announcement__title">
        Pets that recently have found their homes
      </h3>
      <Carousel />
    </section>
  );
};
