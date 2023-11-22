import React from 'react';

type Props = {
  size: number;
  color: string;
}

export const UserIcon: React.FC<Props> = ({ color, size }) => {
  return (
    <svg width={ `${size}px` } height={`${size}px`} viewBox="0 0 18 19" color='red' fill='none' xmlns="http://www.w3.org/2000/svg">
      <path d="M9 11.75C11.4853 11.75 13.5 9.73528 13.5 7.25C13.5 4.76472 11.4853 2.75 9 2.75C6.51472 2.75 4.5 4.76472 4.5 7.25C4.5 9.73528 6.51472 11.75 9 11.75Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M2.17969 15.6874C2.87081 14.4901 3.86496 13.4958 5.06219 12.8045C6.25941 12.1132 7.61753 11.7493 9 11.7493C10.3825 11.7493 11.7406 12.1132 12.9378 12.8045C14.135 13.4958 15.1292 14.4901 15.8203 15.6874" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
