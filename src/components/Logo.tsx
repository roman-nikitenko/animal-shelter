import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <>
      <div className="logo">
        <Link to="/">
          <img className="logo__image" src={logo}/>
          HappyPaws
        </Link>
      </div>

    </>
  );
};
