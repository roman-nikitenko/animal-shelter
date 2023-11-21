import React from 'react';
import { Logo } from './Logo';
import personImg from '../assets/person.svg';
import logOut from '../assets/logout.svg';
import { useNavigate, NavLink } from 'react-router-dom';
import userIcon from '../assets/userIcon.svg';

export const  Navigation: React.FC = () => {
  const navigate = useNavigate();

  function hasJWT() {
    let flag: boolean;

    localStorage.getItem("token") ? flag = true : flag = false;

    return flag;
  }

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate('/');
  }

  return (
    <div className="navigation">
      <div className="menu">
        <div className="menu__logo">
          <Logo />
        </div>
        <div className="menu__nav">
          <ul className="nav menu__retreat">
            <li className="nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'activeLink' : 'nav__link'}
                to="/list-of-pets"
              >
                Pets
              </NavLink>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">Services</a>
            </li>
            <li className="nav__item">
              <NavLink
                className={({ isActive }) => isActive ? 'activeLink' : 'nav__link'}
                to="/donation"
              >
                Donations
              </NavLink>
            </li>
            <li className="nav__item">
              <a className="nav__link" href="#">About</a>
            </li>
          </ul>
        </div>
        <div className="menu__registration registration">

          {hasJWT() ? (
            <div className="user-menu">
              <img
                className="user-menu__user"
                src={personImg}
                alt="person button"
                onClick={() => navigate('/user')}
              />
              <img
                className="user-menu__logout"
                src={logOut}
                alt="log out button"
                onClick={logOutHandler}
              />
            </div>
          ) : (
            <>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? 'button button__signIn activeButton' : 'button button__signIn'
                }}
                to="/access/login"
              >
                <img src={userIcon} />
                Sign in
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? 'button button__registration activeButton' : 'button button__registration'
                }}
                to="/access/registration"
              >
                Registration
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
