import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { PetsContext } from '../store/PetsContext';
import classNames from 'classnames';
import { FilterItem } from '../components/FilterItem';

export const ListOfPets: React.FC = () => {
  const [showPets, setShowPets] = useState('All pets');
  const [showAges, setShowAges] = useState('Ages');
  const [showSex, setShowSex] = useState('Sex');
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const petsRef = useRef(null);
  const ageRef = useRef(null);
  const sexRef = useRef(null);

  const { pets } = useContext(PetsContext);

  const filters = {
    pet: 'All pets',

  }


  return (
    <>
      <header className="header__list-of-pets">
        <p className="header__list-of-pets__title">
          Help people to find their pets
        </p>
        <div className="header__list-of-pets__filter filter">
          <div
            onClick={() => {
              setIsActive(prevState => !prevState)
            }}
            ref={petsRef}
            data-pets="showPets"
            className="filter__input"
            >
            <p className="filter__input__title">Kind of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p className="filter__input__name">{showPets}</p>
              <div className="filter__box--mark"></div>
            </div>
            <div className={classNames("drop__down ", {
              'show__dropdown': isActive,
            })}>
              <ul className="drop__down--list">
                <FilterItem title="dog" />
                <FilterItem title="cat" />
              </ul>
            </div>
          </div>
          <div
            onClick={() => {
              setIsActive1(prevState => !prevState)
            }}
            ref={ageRef}
            className="filter__input"
          >
            <p className="filter__input__title">Ages of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p className="filter__input__name">
                {showAges}
              </p>
              <div className="filter__box--mark"></div>
            </div>

            <div className={classNames("drop__down ", {
              'show__dropdown': isActive1,
            })}>
              <ul className="drop__down--list">
                <li className="drop__down--item">Dog</li>
                <li className="drop__down--item">Cat</li>
              </ul>
            </div>
          </div>
          <div
            onClick={() => {
              setIsActive2(prevState => !prevState)
            }}
            ref={sexRef}
            className="filter__input"
          >
            <p className="filter__input__title">Sex of pets</p>
            <div className="filter__box filter__kinds-of-pets">
              <p className="filter__input__name">{showSex}</p>
              <div className="filter__box--mark"></div>
            </div>

            <div className={classNames("drop__down ", {
              'show__dropdown': isActive2,
            })}>
              <ul className="drop__down--list">
                <li className="drop__down--item">Male</li>
                <li className="drop__down--item">Female</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className="main ">
        { pets.length === 0 && <Loader/> }
        <div className="main__list-of-pets">
          {pets.map(pet => (
            <Card key={pet.id} pet={pet} />
          ))}
        </div>

      </main>
    </>
  );
};
