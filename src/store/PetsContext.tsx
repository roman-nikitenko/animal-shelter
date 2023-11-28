import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Animals } from '../types/animals'
import { User } from '../types/user';
import { BASE_URL, getUser } from '../api/fetch';

type petContext = {
  pets: Animals[],
  carouselPets: Animals[],
  user: User | null | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
}

export const PetsContext = createContext<petContext>({
  pets: [],
  carouselPets: [],
  user: null,
  setUser: () => {},
});

type Prop = {
  children: React.ReactNode,
}

export const PetsProvider: React.FC<Prop> = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [carouselPets, setCarouselPets] = useState([]);
  const [user, setUser] = useState<User>();


  let token = localStorage.getItem('token');


  useEffect(() => {
    if (token) {
      getUser(token)
        .then(user => setUser(user))
    }
  }, []);

  useEffect(() => {
    fetch( BASE_URL + '/api/pets/')
      .then(response => response.json())
      .then(petsFromServer => {
        setPets(petsFromServer);
      });
  }, []);

  useEffect(() => {
    fetch(BASE_URL + '/api/pets/statistic/')
      .then(response => response.json())
      .then(pet => {
        setCarouselPets(pet.list_of_last_adopted_pets);
      })
  }, []);

  const value = useMemo(() => ({
    pets,
    carouselPets,
    user,
    setUser
  }), [pets, carouselPets, user]);

  return (
    <PetsContext.Provider value={value}>
      {children}
    </PetsContext.Provider>
  )
}

