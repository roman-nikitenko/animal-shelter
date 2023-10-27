import React from 'react';
import logo from '../assets/logo.svg';

export const Logo: React.FC = () => {
  return (
    <>
      <div className="logo">
        <a href="#">
          <img className="logo__image" src={logo}/>
          HappyPaws
        </a>
      </div>

    </>
  );
};
