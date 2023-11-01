import React, { useContext, useState } from 'react';
import { CarouselItem } from './CarouselItem';
import { PetsContext } from '../../store/PetsContext';
import { Loader } from '../Loader';

export const Carousel: React.FC = () => {
  const { carouselPets } = useContext(PetsContext);
  const [offset, setOffset] = useState(0);
  const showItemPerStep = 3;
  const stepOffset = 320;
  let maxLength = 0;

  if (carouselPets) {
    maxLength = carouselPets?.length * stepOffset / showItemPerStep;
  }

  const next = () => {
    if (offset < -maxLength)  {
      setOffset(stepOffset);
    }
    setOffset(prev => prev - stepOffset);
  };

  const prev = () => {
    if (offset >= 0) {
      setOffset(-maxLength -stepOffset * 2)
    }

    setOffset(prev => prev + stepOffset);
  }

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__button carousel__button--left"
        onClick={prev}
      />

      <div className="carousel__window">
        {carouselPets.length === 0 ? <Loader /> : (
          carouselPets.map(pet => (
            <CarouselItem offset={offset} key={pet.id} animal={pet} />
          ))
        )}
      </div>

      <button
        type="button"
        className="carousel__button carousel__button--right"
        onClick={next}
      />
    </div>
  );
};
