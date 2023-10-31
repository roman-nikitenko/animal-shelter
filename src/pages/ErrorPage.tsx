import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export const ErrorPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="ErrorPage">
        <h1>This page is no exist</h1>
      </div>
      <Footer />
    </>

  );
};
