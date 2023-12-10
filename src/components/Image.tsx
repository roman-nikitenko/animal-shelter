import React from 'react';

type Props = {
  image: string;
  size: number;
}

export const Image: React.FC<Props> = ({ image, size }) => {
  return (
    <div style={{
      backgroundColor: 'transparent',
      width: `${size}px`,
      height: `${size}px`,
    }}>
      <img src={image} style={{
        width: '100%',
        height: '100%',
      }} />
    </div>
  );
};
