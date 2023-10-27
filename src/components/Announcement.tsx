import React from 'react';
import { Carousel } from './corusel/Carousel';

export const Announcement: React.FC = () => {
  return (
    <section className="announcement">
      <h3 className="announcement__title">Announcement for recently found animal</h3>

      <Carousel />
    </section>
  );
};
