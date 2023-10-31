import React from 'react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__logo">
          <Logo />
        </div>
        <div className="footer__navigation">
          <ul className="nav footer__retreat">
            <li className="nav__item">
              <Link to="/list-of-pets" className="nav__link">
                Pets
              </Link>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Services
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Donations
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Account
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                Terms of use
              </a>
            </li>
            <li className="nav__item">
              <a href="#" className="nav__link">
                About
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="sign">
        <p className="sign__text">
          © 2023 Space for pet owners HappyPaws
        </p>
      </div>
    </>

  );
};
