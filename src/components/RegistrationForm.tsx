import React, { useState } from 'react';
import closeIcon from '../assets/close.svg';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/fetch';
import classNames from 'classnames';
import { Loader } from './LoaderTypeScript';
import useValidate from '../servoces/useValidate';

export const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  function validPhoneNumber(phoneNumber: string) {
    return phoneNumber.includes('+380') && phoneNumber.length === 13;
  }

  const [{
    first_name,
    last_name,
    email,
    phone_number,
    password,
    profile_picture,
  }, setValue] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
    profile_picture: '',
  });

  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    phone_number: false,
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

    setValue(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  }

  const validPW = useValidate(password);
  const validPhone = validPhoneNumber(phone_number);


  const closeHandler = () => {
    return navigate('/');
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      last_name: !last_name,
      first_name: !first_name,
      phone_number: !validPhone,
      password: !validPW,
      email: !email,
    });

    if (!last_name || !first_name || !validPhone || !validPW || !email) return

    const newUser = {
      email: email.toLowerCase(),
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      password,
      phone_number,
      profile_picture,
    }

    fetch(BASE_URL + '/api/users/register/', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setSubmitting(true);
        if (!response.ok) {
          throw 'Servers problem'
          return;
        }

        return response.json();
      })
      .then(data => {
        console.log(data)
        navigate('/access/login');
        setSubmitting(false);
        clearForm();
      })
      .catch(error => {
        setSubmitting(false);
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
        <label className="label">
          <input
            className={classNames("form__input", {
              'isDangerous': errors.first_name
            })}
            type="text"
            placeholder="First name"
            name="first_name"
            value={first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p className="error--message">Required</p>}
        </label>

        <label className="label" >
          <input
            className={classNames("form__input", {
              'isDangerous': errors.last_name
            })}
            type="text"
            placeholder="Last name"
            name="last_name"
            value={last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className="error--message">Required</p>}
        </label>

        <label className="label">
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
          {errors.email && <p className="error--message">Required</p>}
        </label>

        <label className="label">
          <input
            className={classNames("form__input", {
              'isDangerous isDangerous--phone': errors.phone_number
            })}
            type="text"
            placeholder="Phone number (+380)"
            name="phone_number"
            value={phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && <p className="error--message">At least 13 digits are required</p>}
        </label>

        <label className="label">
          <input
            className={classNames("form__input", {
              'isDangerous': errors.password
            })}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <p className="error--message">Min 8 characters - contains @A1</p>}
        </label>

        {submitting && <Loader size={1} />}
        {!submitting && <button className="form__button" type="submit">Register</button>}

      </form>
    </div>
  );
};
