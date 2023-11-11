import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../components/PaymentForm';

export const DonatePage: React.FC = () => {

  const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
