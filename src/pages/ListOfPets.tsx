import React, { useContext } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { PetsContext } from '../store/PetsContext';

export const ListOfPets: React.FC = () => {
  const { pets } = useContext(PetsContext);
  console.log(pets)
  return (
    <>
      <header className="header__list-of-pets">
        <p className="header__list-of-pets__title">
          Help people to find their pets
        </p>
        <div className="header__list-of-pets__filter filter">
          <div className="filter__input">
            <p className="filter__input__title">Kind of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p>All pets</p>
              <div className="filter__box--mark"></div>
            </div>
          </div>
          <div className="filter__input">
            <p className="filter__input__title">Kind of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p>
                Age
              </p>
              <div className="filter__box--mark"></div>
            </div>
          </div>
          <div className="filter__input">
            <p className="filter__input__title">Kind of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p>Sex</p>
              <div className="filter__box--mark"></div>
            </div>
          </div>
        </div>
      </header>
      <main className="main__list-of-pets">

        {pets.length === 0 ? <Loader/> : pets.map(pet => (
          <Card pet={pet} />
        ))}
      </main>
    </>
  );
};
