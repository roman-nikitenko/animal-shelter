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
      sex: 'Female',
      breed: null,
      name: 'Rob',
      phoneNumber: '(095) 234 56 78',
      photo: unknownDog,
      animalType: 'dog',
    },
    {
      id: 2,
      sex: 'Male',
      breed: 'Shorthair',
      name: 'Katy',
      phoneNumber: '(095) 234 56 78',
      photo: cat,
      animalType: 'cat',
    },
    {
      id: 3,
      sex: 'Female',
      breed: 'Cocker Spaniel',
      name: 'Shon',
      phoneNumber: '(095) 234 56 78',
      photo: dog,
      animalType: 'dog',
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
