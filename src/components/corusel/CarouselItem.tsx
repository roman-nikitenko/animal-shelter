import React from 'react';
import { Animals, AnimalType, Sex } from '../../types/animals';
import './carouselItem.scss'
import phone from '../../assets/phone.svg';
import mala from '../../assets/male.svg';
import female from '../../assets/female.svg';
import cat from '../../assets/cat.svg';
import dog from '../../assets/dog.svg';
import point from '../../assets/point.svg';
import image from '../../assets/unknown.jpg';


type Props = {
  animal: Animals;
}

export const CarouselItem: React.FC<Props> = ({ animal }) => {
  // const image = require(animal.photo)

  const gender = (sex: Sex) => {
    return sex === 'Female' ? female : mala;
  }

  const breed = (animal: AnimalType): string => {
    return animal === 'cat' ? cat : dog;
  }


  return (
    <div className="carouselItem">
      <div
        className="carouselItem__photo"
        style={{
          backgroundImage: `url(${animal.photo})`
        }}
      />
      <div className="carouselItem__information">
        <p className="carouselItem__information__sex">
          <img src={gender(animal.sex)} />
          {animal.sex}
        </p>
        <p className="carouselItem__information__address">
          <img src={point} />
          {animal.address}
        </p>
        <p className="carouselItem__information__breed">
          <img src={breed(animal.animalType)} alt="breed"/>
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
