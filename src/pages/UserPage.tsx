import React, { useState } from 'react';
import userPhoto from '../assets/user.jpg'

export const UserPage: React.FC = () => {
  const [edit, setEdit] = useState(false);

  const editHandler = () => {
    setEdit(prevState => !prevState);
  }


  return (
    <section className="user-page">
      <img className="user-page__photo" src={userPhoto} alt="user photo" />
      <article className="user-page__information">

        <h2>Kayl Menson</h2>
        <p>user@admin.net</p>
        <p>(067) 234 234 543</p>

        <div className="user-page__edit-button--position">
          <button
            className="user-page__edit-button"
            onClick={editHandler}
          >
            Edit
          </button>
        </div>
      </article>

    </section>
  );
};
