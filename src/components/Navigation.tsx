import React from 'react';
import { Logo } from './Logo';

export const Navigation: React.FC = () => {
  return (
    <div className="navigation">
      <div className="menu">
        <div className="menu__logo">
          <Logo />
        </div>
        <div className="menu__nav">
          <ul className="nav menu__retreat">
            <li className="nav__item">
              <a className="nav__link" href="#">Lost pets</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Found pets</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">About</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Services</a>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Donations</a>
            </li>
          </ul>
        </div>
        <div className="menu__registration registration">
          <button className="button button__signIn" type="button">Sign in</button>
          <button className="button button__registration" type="button">Registration</button>
        </div>
      </div>
    </div>
  );
};
