import React, { useState } from 'react';
import closeIcon from '../assets/close.svg'
import { Outlet, useNavigate } from 'react-router-dom';
import { init } from '../utility/localClient';
import { log } from 'util';
import { RegistrationForm } from '../components/RegistrationForm';

export const AccessPage: React.FC = () => {


  return (
    <div className="RegistrationPage registration">
      <div className="registration__left-box" />
      <div className="registration__right-box">
        <Outlet />
      </div>
    </div>
  );
};
