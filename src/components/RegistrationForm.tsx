import React, { useState } from 'react';
import closeIcon from '../assets/close.svg';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [{
    email,
    password,
    first_name,
    last_name,
    phone_number,
    profile_picture,
  }, setValue] = useState({
    first_name: '',
    email: '',
    password: '',
    phone_number: '',
    last_name: '',
    profile_picture: '',
  });

  const [errors, setErrors] = useState({
    first_name: false,
    email: false,
    password: false,
  });

  const clearForm = () => {
    setValue({
      first_name: '',
      password: '',
      email: '',
      phone_number: '',
      last_name: '',
      profile_picture: '',
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
      email: email.toLowerCase(),
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      password,
      phone_number,
      profile_picture,
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
          console.log('something went wrong');
          return;
        }

        return response.json();
      })
      .then(data => {
        console.log(data)
        navigate('/access/login');
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
          placeholder="First name"
          name="first_name"
          value={first_name}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="text"
          placeholder="Last name"
          name="last_name"
          value={last_name}
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
          type="text"
          placeholder="Phone number (+380)"
          name="phone_number"
          value={phone_number}
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
