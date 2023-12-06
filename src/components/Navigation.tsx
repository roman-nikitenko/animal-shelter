import React, { useContext } from 'react';
import { Logo } from './Logo';
import { useNavigate, NavLink } from 'react-router-dom';
import userIcon from '../assets/userIcon.svg';
import { UserIcon } from './UserIcon';
import { PetsContext } from '../store/PetsContext';

export const  Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(PetsContext);

  function hasJWT() {
    let flag: boolean;

    localStorage.getItem("token") ? flag = true : flag = false;

    return flag;
  }

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setUser(undefined);
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
        <div className="registration">
          <div className="registration__menu">
            {hasJWT() ? (
              <div className="user-menu">
                <NavLink  to="/user" className="user-button">
                  <UserIcon size={23} color={'#FAFAF9'} />
                </NavLink>

                <button
                  className="button button__signIn"
                  type="button"
                  onClick={logOutHandler}
                >
                  <UserIcon size={23} color={'#6D28D9'} />
                  Sign out
                </button>
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
                  <p className="sign-in__text">Sign in</p>
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
          <div className="burger"></div>
        </div>


      </div>
    </div>
  );
};
