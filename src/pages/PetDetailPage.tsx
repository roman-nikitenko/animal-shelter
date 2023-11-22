import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { firstLetterUpperCase, gender, petType } from '../utility/pickIcon';
import sizeImg from '../assets/size.svg';
import { AnimalType, Gender } from '../types/animals';
import goToBack from '../assets/arrowGoToback.svg'

type PetDetailType = {
  age: string,
  animal_type: AnimalType,
  breed: string,
  color: string,
  gender: Gender,
  id: number,
  image: string,
  name: string,
  size: string,
  story: string,
  is_adopted: boolean,
}

export const PetDetailPage: React.FC = () => {
  const [pet, setPet] = useState<PetDetailType>();
  const id = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://happy-paws-animal-shelter.onrender.com/api/pets/${id.petId}`)
      .then(response => response.json())
      .then(data => setPet(data))
  }, []);

  return (
    <>
      {!pet && <Loader />}

      {pet && (
        <div className="detail-page">
          <section className="top__section">
            <div className="back-to-pets">
              <div onClick={() => navigate(-1)} className="back-to-pets__text">
                <img src={goToBack} alt="arrow go to back"/>
                Back to pets
              </div>
            </div>
            <div className="detail-page__content">
              <div className="detail-page__text">
                <h1 className="detail-page__name">{pet.name}</h1>
                <p className="detail-page__story">{pet.story}</p>
              </div>

              {!pet.is_adopted && <button className="button detail-page__button">Respond</button>}

            </div>
            <div className="detail-page__box">
              <img className="detail-page__box--img" src={pet.image} />
            </div>
          </section>
          <section className="bottom__section">
            <div className="bottom__section--paragrahp">
              <div className="bottom__section--paragrahp__subtitle">
                Gender
                <img src={gender(pet.gender)} />
              </div>

              <p className="bottom__section--paragrahp__description">{pet.gender}</p>
            </div>
            <div className="bottom__section--paragrahp">
              <div className="bottom__section--paragrahp__subtitle">
                Breed
                <img src={petType(pet.animal_type)} />
              </div>

              <p className="bottom__section--paragrahp__description">{firstLetterUpperCase(pet.breed)}</p>
            </div>
            <div className="bottom__section--paragrahp">
              <div className="bottom__section--paragrahp__subtitle">
                Size
                <img src={sizeImg} alt="pet size"/>
              </div>

              <p className="bottom__section--paragrahp__description">{pet.size}</p>
            </div>
          </section>

        </div>
      )}

    </>

  );
};
