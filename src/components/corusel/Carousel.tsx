import React, { useContext, useState } from 'react';
import { CarouselItem } from './CarouselItem';
import { PetsContext } from '../../store/PetsContext';
import { Loader } from '../Loader';

export const Carousel: React.FC = () => {
  const animals = useContext(PetsContext);
  const [offset, setOffset] = useState(0);
  const stepOffset = 960;
  let maxLength = 0;
  const showItemPerStep = 3

  if (animals) {
    maxLength = animals?.length * stepOffset / showItemPerStep
  }

  console.log(offset, -maxLength )


  const next = () => {
    if (offset <= -maxLength + stepOffset)  {
      console.log(true)
      setOffset(stepOffset);
    }
    setOffset(prev => prev - stepOffset);
  };

  const prev = () => {
    if (offset >= 0) {
      setOffset(-maxLength);
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

        {!animals ? <Loader /> : (
          animals.map(animal => (
            <CarouselItem offset={offset} key={animal.id} animal={animal} />
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
