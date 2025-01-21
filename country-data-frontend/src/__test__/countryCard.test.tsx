import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import CountryCard from '../components/CountryCard';

interface CountryCardProps {
  flag: string;
  name: string;
  capital: string;
  population: number;
  region: string;
}

test('renders country card with correct details', () => {
  // Sample props for the CountryCard component
  const country: CountryCardProps = {
    flag: 'https://example.com/flag.png',
    name: 'Germany',
    capital: 'Berlin',
    population: 83000000,
    region: 'Europe',
  };

  // Render the component with the test data
  render(
    <CountryCard
      flag={country.flag}
      name={country.name}
      capital={country.capital}
      population={country.population}
      region={country.region}
    />
  );

  // Check if the country name is rendered correctly
  expect(screen.getByText(/Germany/i)).toBeInTheDocument();

  // Check if the capital city is displayed
  expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
  expect(screen.getByText(/Berlin/i)).toBeInTheDocument();

  // Check if the population is correctly formatted
  expect(screen.getByText(/Population:/i)).toBeInTheDocument();
  expect(screen.getByText(/83,000,000/i)).toBeInTheDocument(); // Assuming population is formatted with commas

  // Check if the region is displayed
  expect(screen.getByText(/Region:/i)).toBeInTheDocument();
  expect(screen.getByText(/Europe/i)).toBeInTheDocument();

  // Check if the flag image is displayed
  const flagImage = screen.getByAltText('Germany Flag');
  expect(flagImage).toBeInTheDocument();
  expect(flagImage).toHaveAttribute('src', country.flag);
});
