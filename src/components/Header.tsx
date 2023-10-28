import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h2 className="header__title">Let's help reunite lost pets with their families</h2>
        <div className="content__buttons">
          <button type="button" className="button button__get-pet">Get pet</button>
        </div>
      </div>
      <div className="header__image"></div>
    </header>
  );
};
