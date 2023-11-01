import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Animals } from '../types/animals'

type petContext = {
  pets: Animals[],
  carouselPets: Animals[],
}

export const PetsContext = createContext<petContext>({
  pets: [],
  carouselPets: [],
});

type Prop = {
  children: React.ReactNode,
}

export const PetsProvider: React.FC<Prop> = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [carouselPets, setCarouselPets] = useState([]);

  useEffect(() => {
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/')
      .then(response => response.json())
      .then(petsFromServer => {
        setPets(petsFromServer);
      });
  }, []);

  useEffect(() => {
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/statistic/')
      .then(response => response.json())
      .then(pet => {
        setCarouselPets(pet.list_of_last_adopted_pets);
      })
  }, []);

  const value = useMemo(() => ({
    pets,
    carouselPets,
  }), [pets, carouselPets]);

  return (
    <PetsContext.Provider value={value}>
      {children}
    </PetsContext.Provider>
  )
}

