import React, { useContext, useRef, useState } from 'react';
import { Logo } from './Logo';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import userIcon from '../assets/userIcon.svg';
import { UserIcon } from './UserIcon';
import { PetsContext } from '../store/PetsContext';
import classNames from 'classnames';
import { Image } from './Image';
import imageCross from '../assets/x.svg';
import imageBurger from '../assets/burger.svg'

export const  Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(PetsContext);
  const [showBurger, setShowBurger] = useState(true);
  const burgerRef = useRef(null);
  const { user } = useContext(PetsContext);

  const chuseIcon = () => {
    return showBurger ?
      <Image image={imageCross} size={40} /> :
      <Image image={imageBurger} size={40} />
  }

  function hasJWT() {
    let flag: boolean;

    localStorage.getItem("token") ? flag = true : flag = false;

    return flag;
  }

  const moveToUser = () => {
    navigate('/user');
    closeBurger();
  }

  function closeBurger() {
    setShowBurger(false);
  }

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    navigate('/');
  }

  return (
    <div className="navigation">
      <div className="menu">
        <div className="menu__logo" onClick={closeBurger}>
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
          <div onClick={() => {
            setShowBurger(prevState => !prevState)
          }} className="burger" >
            {chuseIcon()}
          </div>

            <div ref={burgerRef} className={classNames("burger__menu", {
              "burgerOn": showBurger,
              "burgerOff": !showBurger,
            })}>
              <div className="burger__menu__list">
                <Link to="/list-of-pets" onClick={closeBurger}>Pets</Link>
                <Link to="/" onClick={closeBurger}>Services</Link>
                <Link to="/" onClick={closeBurger}>Donation</Link>
                <Link to="/" onClick={closeBurger}>About</Link>
              </div>

              {!user && (
                <div className="burger__menu__links">
                  <Link className="link" to="/access/registration" onClick={closeBurger}>Registration</Link>
                  /
                  <Link className="link" to="/access/login" onClick={closeBurger} >Sign in</Link>
                </div>
              )}

              {user && (
                <div onClick={moveToUser} className="burger__menu__profile">
                  <img className="burger__menu__profile--image" src={user?.profile_picture} />
                  <p className="burger__menu__profile--name">{user?.first_name} {user?.last_name}</p>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};
