import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Animals } from '../types/animals'
import { User } from '../types/user';
import { BASE_URL, getUser } from '../api/fetch';
import { useNavigate } from 'react-router-dom';

type petContext = {
  pets: Animals[],
  carouselPets: Animals[],
  user: User | null | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  logOutHandler: () => void,
}

export const PetsContext = createContext<petContext>({
  pets: [],
  carouselPets: [],
  user: null,
  setUser: () => {},
  logOutHandler: () => {},
});

type Prop = {
  children: React.ReactNode,
}

export const PetsProvider: React.FC<Prop> = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [carouselPets, setCarouselPets] = useState([]);
  const [user, setUser] = useState<User>();

  window.addEventListener('storage', () => {
    console.log('Storage changed');
  })


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


  const logOutHandler = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  }

  const value = useMemo(() => ({
    pets,
    carouselPets,
    user,
    setUser,
    logOutHandler
  }), [pets, carouselPets, user]);

  return (
    <PetsContext.Provider value={value}>
      {children}
    </PetsContext.Provider>
  )
}

