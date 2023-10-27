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
      address: 'Kyiv, Vinnitska, 1',
      phoneNumber: '(095) 234 56 78',
      photo: unknownDog,
      animalType: 'dog',
    },
    {
      id: 2,
      sex: 'Male',
      breed: 'Shorthair',
      address: 'Kyiv, Flotovo, 89',
      phoneNumber: '(095) 234 56 78',
      photo: cat,
      animalType: 'cat',
    },
    {
      id: 3,
      sex: 'Female',
      breed: 'Cocker Spaniel',
      address: 'Kyiv, Boshama, 16',
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
