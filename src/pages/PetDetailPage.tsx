import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';

type PetDetailType = {
  age: string,
  animal_type: string,
  breed: string,
  color: string,
  gender: string,
  id: number,
  image: string,
  name: string,
  size: string,
  story: string,
}

export const PetDetailPage: React.FC = () => {
  const [pet, setPet] = useState<PetDetailType>();
  const id = useParams();

  useEffect(() => {
    fetch(`https://happy-paws-pqwx.onrender.com/api/pets/${id.petId}`)
      .then(response => response.json())
      .then(data => setPet(data))
  }, []);

  return (
    <>
      {!pet && <Loader />}

      {pet && (
        <div className="DetailPage">
          <h1>Detail page {pet.name}</h1>
        </div>
      )}

    </>

  );
};
