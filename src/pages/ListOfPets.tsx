import React, { useEffect, useState } from 'react';
import { Animals } from '../types/animals';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';

export const ListOfPets: React.FC = () => {
  const [pets, getPets] = useState<Animals[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/')
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        getPets(data);
      })
  }, []);



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

          {isLoading && (
            <div className="loader__center">
              <Loader />
            </div>
          )}

        {!isLoading && pets.map(pet => (
          <Card pet={pet} />
        ))}
      </main>
    </>
  );
};
