import './Loader.scss';
import React from 'react';

type Prop = {
 size: number;
}

export const Loader: React.FC<Prop> = ({ size }) => (
  <div className="Loader" data-cy="Loader">
    <div className="Loader__content" style={{
      'width': size + 'rem',
      'height': size + 'rem',
    }} />
  </div>
);
