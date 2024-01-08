import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader/';
import { PetsContext } from '../store/PetsContext';
import { DropDown } from '../components/DropDown';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../api/fetch';
import { Animals } from '../types/animals';
import emptyPets from '../assets/searchPet.jpg';

export const ListOfPets: React.FC = () => {
  const { pets, isLoading } = useContext(PetsContext);
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSearchButton, setShowSearchButton] = useState(!!searchParams.size && true)
  const [filteredPets, setFilteredPets] = useState<Animals[] | null>(null);
  const [sending, setSending] = useState(false);

  const age = searchParams.get('age') || 'Ages';
  const gender = searchParams.get('gender') || 'Gender';
  const typeOfPets = searchParams.get('animal_type') || 'All pets';

  const listOfTypePets = ["Dog", "Cat"];
  const listOfSex = ["Male", "Female"];
  const listAges = ["Baby", "Young", "Adult", "Senior"];

  const validMeesSearch = filteredPets?.length === 0 && searchParams.size !== 0 && !isLoading && !sending;

  console.log(validMeesSearch)

  const handlerChange = (field: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(field, value);

    setSearchParams(params);

    setShowSearchButton(true)
  }

  useEffect(() => {
    setFilteredPets(pets)
  }, [pets])

  const searchPets = async () => {
    setSending(true);
    fetch(BASE_URL + `/api/pets/${search}`)
      .then(response => response.json())
      .then(pets => {
        setSending(false);
        setFilteredPets(pets);
      })
  }

  const cancelFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('age');
    params.delete('gender');
    params.delete('animal_type');

    setSearchParams(params);
    setShowSearchButton(false);
    setFilteredPets(pets);
  }



  return (
    <>
      <header className="header__list-of-pets">
        <p className="header__list-of-pets__title">
          Help people to find their pets
        </p>
        <div className="filter">
          <div className="filter__group">
            <DropDown
              subTitle="Kind of pets"
              title={typeOfPets}
              dropdownList={listOfTypePets}
              handlerChange={handlerChange}
              field="animal_type"
            />
            <DropDown
              subTitle="Gender"
              title={gender}
              dropdownList={listOfSex}
              handlerChange={handlerChange}
              field="gender"
            />
            <DropDown
              subTitle="Ages"
              title={age}
              dropdownList={listAges}
              handlerChange={handlerChange}
              field="age"
            />
          </div>

          {showSearchButton && (
            <div className="filter__group--buttons">
              <div className="filter__button">
                <button
                  onClick={cancelFilters}
                  className="button"
                >
                  Cancel
                </button>
              </div>

              <div className="filter__button">
                <button onClick={searchPets} className="button">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="main">
        { isLoading && <Loader/> }
        { sending && <Loader/> }

        { !sending && (
          <div className="main__list-of-pets">
            {filteredPets?.map(pet => (
              <Card key={pet.id} pet={pet} />
            ))}
          </div>
        )}

        { validMeesSearch && (
          <div className="main__empty">
            <p className="main__empty--text">
              We did not find any matches
            </p>
            <img src={emptyPets} className="emptyPets" />
          </div>
        ) }
      </main>
    </>
  );
};
