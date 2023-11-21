import React, { useEffect, useState } from 'react';
import userPhoto from '../assets/user.jpg'
import { Loader } from '../components/LoaderTypeScript';
import { firstLetterUpperCase } from '../utility/pickIcon';
import { User } from '../types/user';
import { getUser } from '../api/fetch';

export const UserPage: React.FC = () => {
  // const [edit, setEdit] = useState(false);
  const [user, setUser] = useState<User>();

  let token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
        getUser(token)
          .then(user => {
            setUser(user);
          })
      }
  }, []);

  if (!token) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center',alignItems: 'center', height: '76vh'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <h1>No token access</h1>
          <p>Please fill in registration form</p>
        </div>
      </div>
    )
  }


  // const editHandler = () => {
  //   setEdit(prevState => !prevState);
  // }


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
