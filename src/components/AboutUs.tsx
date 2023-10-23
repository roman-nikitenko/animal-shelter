import React from 'react';
import image1 from '../assets/cat-orange.jpg';
import image2 from '../assets/bigl.jpg';
import image3 from '../assets/dog.jpg';


export const AboutUs: React.FC = () => {
  return (
    <section className="about-us">
      <h3 className="about-us__title"> About Us</h3>
      <div className="about-us__content">
        <div className="about-us__block-images">
          <div className="image-block">
            <img className="image-block__images image1" src={image3}/>
          </div>
          <div className="image-block">
            <img className="image-block__images image2" src={image2}/>
          </div>
          <div className="image-block">
            <img className="image-block__images image3" src={image1}/>
          </div>
        </div>
        <div className="about-us__text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illum labore mollitia optio rem soluta ut, veniam voluptatem? Adipisci, aspernatur dolor iure labore laudantium neque praesentium quis quod! Ab amet, assumenda consectetur consequuntur corporis deleniti nostrum recusandae reiciendis sapiente sed suscipit vel voluptate voluptatum? Accusamus commodi debitis id necessitatibus repellendus?
          </p>
          <p className="second-paragraph">
            <h4>Out Mission:</h4>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto debitis est id ipsam libero officia porro, quae quaerat quo ratione recusandae rem sed totam veniam voluptatibus. Architecto aspernatur doloribus eaque eligendi facere labore mollitia nisi officia, quo quos sit tempore vitae. Adipisci eveniet facere quod reprehenderit unde. Laboriosam.
          </p>
        </div>
      </div>
    </section>
  );
};
