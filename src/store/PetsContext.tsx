import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Animals } from '../types/animals'
import { User } from '../types/user';

type petContext = {
  pets: Animals[],
  carouselPets: Animals[],
  user: User | null | undefined,
}

export const PetsContext = createContext<petContext>({
  pets: [],
  carouselPets: [],
  user: null,
});

type Prop = {
  children: React.ReactNode,
}

export const PetsProvider: React.FC<Prop> = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [carouselPets, setCarouselPets] = useState([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch('https://happy-paws-animal-shelter.onrender.com/api/pets/')
      .then(response => response.json())
      .then(petsFromServer => {
        setPets(petsFromServer);
      });
  }, []);

  useEffect(() => {
    fetch('https://happy-paws-animal-shelter.onrender.com/api/pets/statistic/')
      .then(response => response.json())
      .then(pet => {
        console.log(pet.list_of_last_adopted_pets)
        setCarouselPets(pet.list_of_last_adopted_pets);
      })
  }, []);

  const value = useMemo(() => ({
    pets,
    carouselPets,
    user,
  }), [pets, carouselPets, user]);

  return (
    <PetsContext.Provider value={value}>
      {children}
    </PetsContext.Provider>
  )
}

