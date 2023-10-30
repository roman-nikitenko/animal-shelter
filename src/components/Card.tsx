import React from 'react';
import { Animals } from '../types/animals';
import { petType, gender, firstLetterUpperCase } from '../utility/pickIcon';

type Prop = {
  pet: Animals
}

export const Card: React.FC<Prop> = ({ pet }) => {

  return (
    <div className="card">
      <img className="card__image" src={pet.image} alt="dog or cat" />
      <div className="card__description">
        <h4 className="card__description--name">{pet.name}</h4>
        <p>
          <img src={petType(pet.animal_type)}/>
          {firstLetterUpperCase(pet.breed)}, {pet.age} y.o.
        </p>
        <p>
          <img src={gender(pet.gender)}/>
          {pet.gender}
        </p>
        <a className="card__link" href='#'>See details</a>
      </div>
    </div>
  );
};
