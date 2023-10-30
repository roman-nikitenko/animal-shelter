import React from 'react';
import { Animals } from '../../types/animals';
import { CarouselItem } from './CarouselItem';
import dog from '../../assets/bigl.jpg';
import cat from '../../assets/sharthair.jpg';
import unknownDog from '../../assets/unknown.jpg';

export const Carousel: React.FC = () => {
  const animals: Animals[] = [
    {
      id: 1,
      gender: 'Female',
      breed: null,
      name: 'Rob',
      phoneNumber: '(095) 234 56 78',
      image: unknownDog,
      animal_type: 'dog',
    },
    {
      id: 2,
      gender: 'Male',
      breed: 'Shorthair',
      name: 'Katy',
      phoneNumber: '(095) 234 56 78',
      image: cat,
      animal_type: 'cat',
    },
    {
      id: 3,
      gender: 'Female',
      breed: 'Cocker Spaniel',
      name: 'Shon',
      phoneNumber: '(095) 234 56 78',
      image: dog,
      animal_type: 'dog',
    },
  ]

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__button carousel__button--left"
      />

      {animals.map(animal => (
        <CarouselItem animal={animal} />
      ))}
      <button
        type="button"
        className="carousel__button carousel__button--right"
      />
    </div>
  );
};
