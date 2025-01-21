import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';
import '@testing-library/jest-dom'; // for custom matchers like toBeInTheDocument
import Home from '../pages/index';

// Mock the CountryCard component to avoid lazy loading during tests
vi.mock('../components/CountryCard', () => ({
  default: () => <div>Mocked CountryCard</div>,
}));

// Mock API calls
vi.mock('../services/countryService', () => ({
  getCountries: vi.fn(),
  getCountriesByRegion: vi.fn(),
}));

describe('Home Component', () => {
  test('renders loading state initially', () => {
    render(<Home />);

    // Check if loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state if fetching countries fails', async () => {
    // Mock the API call to fail
    const { getCountries } = require('../services/countryService');
    getCountries.mockRejectedValueOnce(new Error('Failed to load countries'));

    render(<Home />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      expect(screen.getByText('Failed to load countries')).toBeInTheDocument();
    });
  });

  test('renders country cards when data is fetched successfully', async () => {
    // Mock the API response
    const mockCountries = [
      {
        name: 'Germany',
        flag: 'https://example.com/flag.png',
        population: 83000000,
        region: 'Europe',
        currencies: {},
        timezones: [],
      },
      {
        name: 'France',
        flag: 'https://example.com/flag.png',
        population: 67000000,
        region: 'Europe',
        currencies: {},
        timezones: [],
      },
    ];

    const { getCountries } = require('../services/countryService');
    getCountries.mockResolvedValueOnce(mockCountries);

    render(<Home />);

    // Wait for the countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
    });

    // Check if the country cards are displayed
    expect(screen.getAllByText('Mocked CountryCard').length).toBeGreaterThan(0);
  });

  test('handles search input correctly', async () => {
    const mockCountries = [
      {
        name: 'Germany',
        flag: 'https://example.com/flag.png',
        population: 83000000,
        region: 'Europe',
        currencies: {},
        timezones: [],
      },
      {
        name: 'France',
        flag: 'https://example.com/flag.png',
        population: 67000000,
        region: 'Europe',
        currencies: {},
        timezones: [],
      },
    ];

    const { getCountries } = require('../services/countryService');
    getCountries.mockResolvedValueOnce(mockCountries);

    render(<Home />);

    // Wait for the countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });

    // Simulate typing in the search bar
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Germany' } });

    // Check if the search input works and filters the countries
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.queryByText('France')).not.toBeInTheDocument();
  });

  test('renders no countries found message if no countries match the search term', async () => {
    const mockCountries = [
      {
        name: 'Germany',
        flag: 'https://example.com/flag.png',
        population: 83000000,
        region: 'Europe',
        currencies: {},
        timezones: [],
      },
    ];

    const { getCountries } = require('../services/countryService');
    getCountries.mockResolvedValueOnce(mockCountries);

    render(<Home />);

    // Wait for the countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });

    // Simulate typing in the search bar
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'Spain' } });

    // Check if "No countries found" message is displayed
    expect(screen.getByText('No countries found.')).toBeInTheDocument();
  });
});
