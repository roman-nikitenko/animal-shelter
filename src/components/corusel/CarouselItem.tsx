import React from 'react';
import { Animals } from '../../types/animals';
import './carouselItem.scss'
import paw from '../../assets/paw.svg';
import size from '../../assets/size.svg';
import { petType, gender } from '../../utility/pickIcon';
import { Link } from 'react-router-dom';


type Props = {
  animal: Animals;
  offset: number
}

export const CarouselItem: React.FC<Props> = ({ animal, offset }) => {
  return (
    <div className="carouselItem" style={{ transform: `translateX(${offset}px)` }}>
      <div
        className="carouselItem__photo"
      >
        <img className="carouselItem__img" src={animal.image} alt={animal.name}/>
    </div>
      <div className="carouselItem__information">
        <p className="carouselItem__information__sex">
          <img src={gender(animal.gender)} />
          {animal.gender}
        </p>
        <p className="carouselItem__information__address">
          <img src={paw} />
          {animal.name}
        </p>
        <p className="carouselItem__information__breed">
          <img src={petType(animal.animal_type)} alt="breed"/>
          {!animal.breed ? 'Unknown' : animal.breed}
        </p>
        <p className="carouselItem__information__phone-number">
          <img src={size} alt="phone"/>
          {animal.size}
        </p>
        <Link
          className="carouselItem__information__link"
          to={`/list-of-pets/${animal.id}`}
        >
          See details
        </Link>
      </div>
    </div>
  );
};
