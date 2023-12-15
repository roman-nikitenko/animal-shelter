import React from 'react';
import { CardElement, useStripe } from '@stripe/react-stripe-js';

export const PaymentForm: React.FC = () => {
  const stripe = useStripe();

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const appearance = {
    theme: 'stripe',
  }

  return (
    <div className="donation">
      <h1>Donation Page</h1>
    </div>
  );
};
