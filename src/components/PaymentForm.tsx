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
    <>
      <div className="pay">
        <div className="pay__left">

        </div>
        <div className="pay__right">
          <form className="pay__form" onSubmit={handlerSubmit}>
            <CardElement />
            <button>Pay</button>
          </form>
        </div>

      </div>
    </>
  );
};
