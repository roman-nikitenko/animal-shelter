import React from 'react';

type Prop = {
  title: string;
}


export const FilterItem: React.FC<Prop> = ({ title }) => {
  return (
    <li className="drop__down--item">{ title }</li>
  );
};
