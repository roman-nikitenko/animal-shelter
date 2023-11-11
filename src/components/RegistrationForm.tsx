import React, { useState } from 'react';
import closeIcon from '../assets/close.svg';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [{
    email,
    password,
    name,
  }, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const clearForm = () => {
    setValue({
      name: '',
      password: '',
      email: '',
    })
  }

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;

    setValue(current => ({ ...current, [field]: value }))
  }


  const closeHandler = () => {
    return navigate('/');
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting')
    const newUser = {
      email,
      first_name: name,
      password,
    }

    fetch('https://happy-paws-pqwx.onrender.com/api/users/register/', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw 'something went wrong';
        }
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
      <h2 className="registration__from--title">Welcome</h2>
      <p className="registration__from--subtitle">
        Please Register yourself
      </p>
      <form className="form" onSubmit={submitHandler}>
        <input
          className="form__input"
          type="text"
          placeholder="Your name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button className="form__button" type="submit">Register</button>
      </form>
    </div>
  );
};
