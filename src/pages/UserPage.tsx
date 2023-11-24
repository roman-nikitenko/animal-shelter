import React, { useContext, useEffect } from 'react';
import userPhoto from '../assets/user.jpg'
import { Loader } from '../components/LoaderTypeScript';
import { firstLetterUpperCase } from '../utility/pickIcon';
import { PetsContext } from '../store/PetsContext';

export const UserPage: React.FC = () => {
  const { user } = useContext(PetsContext);


  return (
    <>
      {!user && <Loader size={2} />}
      {user && (
        <section className="user-page">
          <article className="user-page__information">
            <img className="user-page__photo" src={userPhoto} alt="user photo" />

            <div className="user-page__description">
              <h2>{firstLetterUpperCase(user.first_name)} {firstLetterUpperCase(user.last_name)}</h2>
              <p>{user.email}</p>
              <p>{user.phone_number}</p>
            </div>
          </article>
        </section>
      )}

    </>

  );
};
