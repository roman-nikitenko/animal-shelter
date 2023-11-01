import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Animals } from '../types/animals'

export const PetsContext = createContext<Animals[] | null>({} as Animals[]);

type Prop = {
  children: React.ReactNode,
}

export const PetsProvider: React.FC<Prop> = ({ children }) => {
  const [pets, setPets] = useState(null)

  useEffect(() => {
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/')
      .then(response => response.json())
      .then(petsFromServer => setPets(petsFromServer));
  }, []);

  const value = useMemo(() => ({
    pets,
    setPets,
  }), [pets]);

  return (
    <PetsContext.Provider value={pets}>
      {children}
    </PetsContext.Provider>
  )
}

