import React, { useEffect, useState } from 'react';
import { Statistics } from '../types/animals';

export const Statistic: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics[]>([]);

  useEffect(() => {
    fetch('https://happy-paws-pqwx.onrender.com/api/pets/statistic/')
      .then(response => response.json())
      .then(data => {
        setStatistics(data.statistic);
      })
  }, []);

  const showPercentagesOrDays = (str: string): string => {
    switch (str) {
      case 'Average time to find a family for a pet':
        return ' days';
      case 'Percentage of adopted pets in the last month':
        return '%';
      default:
        return '';
    }
  }

  return (
    <section className="statistics">
      <div className="statistics__container">
        {statistics.map(stat => (
          <div key={stat.name} className="block">
            <p className="block__title">{stat.name}</p>
            <div className="block__triangle">
              <div className="block__second-triangle">
                <h4 className="block__subtitle">
                  {stat.result}
                  {showPercentagesOrDays(stat.name)}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
