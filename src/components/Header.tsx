import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__menu menu">
        <div className="menu__logo">
          <a href="#">
            <img src="../assets/logo.svg"/>
            PetSearch
          </a>
        </div>
        <div className="menu__nav nav">
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
        </div>
        <div className="menu__registration">
          <button className="button button__signIn" type="button">Sign in</button>
          <button className="button button__registration" type="button">registration</button>
        </div>
      </div>
      <div className="header__content">
        <h1 className="title">Let's help reunite lost pets with their families</h1>
        <div className="content__buttons">
          <button type="button" className="button button__lostPet">I lost a pet</button>
          <button type="button" className="button button__foundPet">I found a pet</button>
        </div>
      </div>
    </header>
  );
};
