import React from 'react';

interface CountryCardProps {
  flag: string;
  name: string;
  capital: string;
  population: number;
  region: string;
}

const CountryCard: React.FC<CountryCardProps> = ({ flag, name, capital, population, region }) => {
  return (
    <div className="max-w-md bg-white shadow-lg rounded-lg flex overflow-hidden m-4">
      {/* Left Side: Country Flag */}
      <div className="w-1/2">
        <img src={flag} alt={`${name} Flag`} className="w-full h-full object-cover" />
      </div>

      {/* Right Side: Country Details */}
      <div className="w-1/2 p-4 flex flex-col justify-center">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">
          <strong>Capital:</strong> {capital}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Region:</strong> {region}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
