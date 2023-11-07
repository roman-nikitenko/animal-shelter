import React from 'react';
import closeIcon from '../assets/close.svg'

export const RegistrationPage: React.FC = () => {
  return (
    <div className="RegistrationPage registration">
      <div className="registration__left-box" />
      <div className="registration__right-box">
        <div className="registration__from">
          <button className="button__close">
            <img className="button__close--icon" src={closeIcon} alt="close the form registration"/>
          </button>
          <h2 className="registration__from--title">Welcome</h2>
          <p className="registration__from--subtitle">
            Please Register yourself
          </p>
          <form className="form">
            <input className="form__input" type="text" placeholder="First Name"/>
            <input className="form__input" type="text" placeholder="Last Name"/>
            <input className="form__input" type="text" placeholder="Phone number"/>
            <input className="form__input" type="email" placeholder="Email"/>
            <input className="form__input" type="password" placeholder="Password"/>
            <input className="form__input" type="password" placeholder="Confirm password"/>
            <button className="form__button" type="submit">Register</button>
          </form>
        </div>
      </div>

    </div>
  );
};
