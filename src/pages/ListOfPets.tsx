import React, { useContext, useState } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { PetsContext } from '../store/PetsContext';
import { DropDown } from '../components/DropDown';
import { useLocation } from 'react-router-dom';

export const ListOfPets: React.FC = () => {
  const { pets } = useContext(PetsContext);
  const { pathname, search } = useLocation();

  console.log(pathname)
  console.log(search)
  const [{
    age,
    sex,
    kindOfPet
  }, setValue] = useState({
    age: 'All ages',
    sex: 'Sex',
    kindOfPet: 'All pets',
  })

  const kindOfPets = ["Dog", "Cat"];
  const listOfSex = ["Male", "Female"];
  const listAges = ["1.0", "2.0", "3.0", "4.0", "5.0", "6.0", "7.0"];

  const handlerChange = (field: string, value: string) => {
    setValue(current => ({ ...current, [field]: value }))
  }

  return (
    <>
      <header className="header__list-of-pets">
        <p className="header__list-of-pets__title">
          Help people to find their pets
        </p>
        <div className="filter">
          <DropDown
            subTitle="Kind of pets"
            title={kindOfPet}
            dropdownList={kindOfPets}
            handlerChange={handlerChange}
            value={kindOfPet}
          />
          <DropDown
            subTitle="Sex"
            title={sex}
            dropdownList={listOfSex}
            handlerChange={handlerChange}
            value={sex}
          />
          <DropDown
            subTitle="Ages"
            title={age}
            dropdownList={listAges}
            handlerChange={handlerChange}
            value={age}
          />
        </div>

        {false && (
          <div style={{ padding: '0 20px 8px' }}>
            <button className="button">Search</button>
          </div>
        )}


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
