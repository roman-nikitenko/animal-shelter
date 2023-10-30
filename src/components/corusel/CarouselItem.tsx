import React from 'react';
import { Animals, AnimalType, Gender } from '../../types/animals';
import './carouselItem.scss'
import phone from '../../assets/phone.svg';
import paw from '../../assets/paw.svg';
import { petType, gender } from '../../utility/pickIcon';


type Props = {
  animal: Animals;
}

export const CarouselItem: React.FC<Props> = ({ animal }) => {



  return (
    <div className="carouselItem">
      <div
        className="carouselItem__photo"
        style={{
          backgroundImage: `url(${animal.image})`
        }}
      />
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
          <img src={phone} alt="phone"/>
          {animal.phoneNumber}
        </p>
        <a className="carouselItem__information__link" href="#">
          See details
        </a>
      </div>
    </div>
  );
};
