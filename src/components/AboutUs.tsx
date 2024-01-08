import React from 'react';
import image1 from '../assets/cat-orange.jpg';
import image2 from '../assets/bigl.jpg';
import image3 from '../assets/dog.jpg';


export const AboutUs: React.FC = () => {
  return (
    <section className="about-us">
      <h2 className="about-us__title"> About Us</h2>
      <div className="about-us__content">
        <div className="about-us__group-of-images">
          <div className="group">
            <div className="image-first one" >
              <img src={image3} />
            </div>
            <div className="image-first two">
              <img src={image2} />
            </div>
            <div className="image-first tree" >
              <img src={image1} />
            </div>
          </div>
        </div>

        <div className="about-us__text">
          <p>
            Welcome to Happy Paws, a dedicated animal shelter committed to providing a safe haven for animals in need. Established with the core belief that every creature deserves love, care, and a place to call home, we have been tirelessly working towards creating a compassionate community for our beloved furry friends.
            At Happy Paws, we prioritize the well-being and happiness of each animal that comes through our doors. With a team of passionate and experienced caregivers, volunteers, and veterinarians, we strive to create a nurturing environment where every wagging tail and purring friend can find solace and a chance for a new beginning.
          </p>
          <div className="second-paragraph">
            <p className="second-paragraph__title">Out Mission:</p>
            Our mission at Happy Paws is simple yet profound: to rescue, protect, and provide a loving sanctuary for animals in need. We are dedicated to promoting animal welfare, advocating for responsible pet ownership, and finding forever homes for our rescued companions.
            We believe that every wag of a tail and every affectionate nuzzle enriches our lives and reminds us of the unconditional love that animals bring. We invite you to be a part of our journey as we continue to make  positive impact on the lives of these remarkable creatures, one paw at a time.

          </div>
        </div>
      </div>
    </section>
  );
};
