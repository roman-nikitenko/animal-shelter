import React, { useEffect } from 'react';
import { BASE_URL } from '../../api/fetch';
import { loadStripe, Stripe } from '@stripe/stripe-js';

export const StripeContent: React.FC = () => {


  let stripe: Stripe | null;

  useEffect(() => {
      fetch(BASE_URL + '/api/donations/config/')
        .then(async (r) => {
          const response = await r.json();
          loadStripe(response.publicKey)
            .then(data => {
             stripe = data;
            })
        })
    }, [])

  useEffect(() => {
      fetch(BASE_URL + '/api/donations/create-checkout-session/')
        .then(async (r) => {
          const response = await r.json();

        })
    }, [])


  const payHandler = () => {
    fetch(BASE_URL + '/api/donations/create-checkout-session/')
      .then(async (r) => {
        const response = await r.json();

        stripe?.redirectToCheckout(response)
      })
      .then((success) => {
        console.log(success)
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  return (
    <div className="donation__button">
      <button onClick={payHandler} className="button">Donate now</button>
    </div>
  );
};

