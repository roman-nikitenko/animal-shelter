import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainImage from '../assets/main-image.png'

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__content">
        <h2 className="header__title">
          Let's help every tail to find their home and loving family
        </h2>
        <div className="content__buttons">
          <button
            onClick={() => navigate('/list-of-pets')}
            type="button"
            className="button button__get-pet">Take me</button>
        </div>
      </div>
      <div className="header__image">
        <img className="main__image" src={mainImage} alt="main image"/>
      </div>
    </header>
  );
};
