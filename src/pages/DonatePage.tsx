import React from 'react';
import { StripeContent } from '../components/payment/StripeContent';
import donateHero from '../assets/donate-hero.jpg'

export const DonatePage: React.FC = () => {


  return (
    <section  className="donation__container">
      <div className="donation__content">

        <h2 className="donation__title">Support Happy Paws</h2>
        <img className="donation__hero" src={donateHero} />
        <p>
          Welcome to the donation page of Happy Paws Animal Shelter. Your contribution plays a vital role in supporting our mission to provide a safe and nurturing environment for our beloved furry friends. Every donation, no matter the size, helps us continue our efforts in rescuing, rehabilitating, and finding forever homes for animals in need.
        </p>

        <h3 className="donation__subtitle">
          How you can help:
        </h3>

        <ul>
          <li>
            <strong>Monetary Donations:</strong> Your financial support enables us to provide essential medical care, nutritious food, and comfortable shelter for our animals. Your generosity ensures that every animal in our care receives the attention and care that they deserve.
          </li>
          <li>
            <strong>Supplies and Materials:</strong> We appreciate donations of the following items to maintain the well-being of our animals:
            <ul>
              <li>High-quality pet food and treats</li>
              <li>Soft bedding and cozy blankets</li>
              <li>Leashes, collars, and harnesses for daily walks</li>
              <li>Interactive toys for mental stimulation and playtime</li>
              <li>Grooming supplies for maintaining good hygiene</li>
              <li>Cleaning supplies to keep our shelter clean and sanitized</li>
            </ul>
          </li>
          <li>
            <strong>Volunteer Your Time:</strong> Join our team of dedicated volunteers and make a difference in the lives of our animals. Whether it's helping with feeding, walking, or providing socialization, your time and compassion contribute to the overall well-being and happiness of our animals.
          </li>
        </ul>

        <p style={{ marginBottom: "30px" }}>
          Your support and generosity are essential in ensuring that our shelter continues to be a safe haven for animals in need. Together, we can create a better world for our four-legged companions. Thank you for being a part of our journey to give these animals a brighter and happier future.
        </p>
      </div>
      <StripeContent />
    </section>
  );
};
