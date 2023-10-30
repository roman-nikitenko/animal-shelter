import React, { useEffect } from 'react';

export const Statistic: React.FC = () => {
  useEffect(() => {
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/statistic/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }, []);

  return (
    <section className="statistics">
      <div className="statistics-column">
        <div className="block">
          <p className="block__title">Number of registered lost animals</p>
          <div className="block__triangle">
            <div className="block__second-triangle">
              <h4 className="block__subtitle">300+</h4>
            </div>
          </div>
        </div>
        <div className="block">
          <p className="block__title">Average time to find a lost animals</p>
          <div className="block__triangle">
            <div className="block__second-triangle">
              <h4 className="block__subtitle">5 days</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="statistics-column">
        <div className="block">
          <p className="block__title">Number of successfully reunited pets</p>
          <div className="block__triangle">
            <div className="block__second-triangle">
              <h4 className="block__subtitle">200+</h4>
            </div>
          </div>
        </div>
        <div className="block">
          <p className="block__title">Percentage of animals returned in the last month</p>
          <div className="block__triangle">
            <div className="block__second-triangle">
              <h4 className="block__subtitle">85%</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
