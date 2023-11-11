import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/close.svg';
import classNames from 'classnames';
import { UserPage } from '../pages/UserPage';

export const LogInForm: React.FC = () => {
  const navigate = useNavigate();

  const [{
    email,
    password,
  }, setValue] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const clearForm = () => {
    setValue({
      password: '',
      email: '',
    })

    setErrors({
      email: false,
      password: false,
    })
  }

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;

    setValue(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  }

  const closeHandler = () => {
    return navigate('/');
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting')
    const user = {
      email,
      password,
    }

    fetch('https://happy-paws-pqwx.onrender.com/api/users/token/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log('wrong access');
          setErrors({ email: true, password: true, })
          return
        }

        console.log(response);
        navigate('/user');
        clearForm();
      })
      .catch(error => {
        console.log('error')
        throw error;
      })
  };

  return (
    <div className="registration__from">
      <button onClick={closeHandler} className="button__close">
        <img
          className="button__close--icon"
          src={closeIcon}
          alt="close the form registration"
        />
      </button>
      <h2 className="registration__from--title">LogIn</h2>
      <p className="registration__from--subtitle">
        Please LogIn yourself
      </p>

      <form className="form" onSubmit={submitHandler}>
        <input
          className={classNames("form__input", {
            'isDangerous': errors.email
          })}
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className={classNames('form__input', {
            'isDangerous': errors.password
          })}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className="form__button" type="submit">Login</button>
      </form>

    </div>
  );
};
