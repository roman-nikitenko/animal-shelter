import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/close.svg';
import classNames from 'classnames';
import { Loader } from './LoaderTypeScript';
import { getUser, logIn } from '../api/fetch';
import { PetsContext } from '../store/PetsContext';

export const LogInForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useContext(PetsContext);

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
    setIsSubmitting(true);

    const user = {
      email: email.toLowerCase(),
      password,
    }

    logIn(user)
      .then(data => {
        if (data) {
          setIsSubmitting(false);
          localStorage.setItem('token', data.access);
          navigate('/user');
        }

        getUser(data.access)
          .then(user => setUser(user))

        clearForm();
      })
      .catch(error => {
        console.log(error, 'something went wrong')
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
      <h2 className="registration__from--title">Sign In</h2>
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
        {isSubmitting && <Loader size={1} />}

        {!isSubmitting && (
          <button className="form__button" type="submit">
            SignIn
          </button>
        ) }

      </form>
    </div>
  );
};
