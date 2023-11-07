import React from 'react';
import { Logo } from './Logo';
import { Link, useNavigate } from 'react-router-dom';

export const  Navigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="menu">
        <div className="menu__logo">
          <Logo />
        </div>
        <div className="menu__nav">
          <ul className="nav menu__retreat">
            <li className="nav__item">
              <Link className="nav__link" to="/list-of-pets">Pets</Link>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Services</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Donations</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">About</a>
            </li>
          </ul>
        </div>
        <div className="menu__registration registration">
          <button className="button button__signIn" type="button">Sign in</button>
          <button
            className="button button__registration"
            type="button"
            onClick={() => navigate('/registration')}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};
