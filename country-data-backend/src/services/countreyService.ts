import axios from 'axios';
// Types
import { Country } from './countryInterface';
// Config
import { REST_COUNTRIES_API } from '../config/config';

// Get all countries
const getCountries = async (): Promise<Country> => {
  try {
    const response = await axios.get(REST_COUNTRIES_API);
    const countries = response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
    }));
    //  Loging.
    console.log({
      desciption: 'info:getCountries in services',
      data: 'countries',
      timestamp: new Date(),
    });

    if (countries && countries.length === 0) {
      throw new Error('No countries available');
    }

    return countries;
  } catch (error) {
    //  Loging.
    console.error({
      desciption: 'error:getCountries in services',
      data: error,
      timestamp: new Date(),
    });
    throw error;
  }
};

// Get country by code
const getCountryByCode = async (code: String): Promise<Country> => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!response.data[0]) {
      throw new Error('No countries available');
    }
    const country = response.data[0];

    const countries: Country = {
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      population: country.population,
      currencies: country.currencies,
      timezones: country.timezones,
    };
    //  Loging.
    console.log({
      desciption: 'info:getCountryByCode in services',
      data: 'countries',
      timestamp: new Date(),
    });

    return countries;
  } catch (error) {
    //  Loging.
    console.error({
      desciption: 'error:getCountryByCode in services',
      data: error,
      timestamp: new Date(),
    });
    throw error;
  }
};

// Filter countries by region
const filterCountriesByRegion = async (region: String): Promise<Country[]> => {
  const response = await axios.get(REST_COUNTRIES_API);

  if (response.data && response.data.length === 0) {
    throw new Error('Not able to get country data! ');
  }
  const countries = response.data
    .filter((country: any) => country.region === region)
    .map((country: any) => ({
      name: country.name.common,
      flag: country.flags.svg,
      region: country.region,
      population: country.population,
      currencies: country.currencies,
      timezones: country.timezones,
    }));

  if (countries && countries.length === 0) {
    throw new Error('No countries available! ');
  }

  //  Loging.
  console.log({
    desciption: 'info:filterCountriesByRegion in services',
    data: 'countries',
    timestamp: new Date(),
  });

  return countries;
};

// Search countries
const searchCountries = async (query: any): Promise<Country[]> => {
  const { name, capital, region, timezone } = query;
  const response = await axios.get(REST_COUNTRIES_API);

  if (!response.data) {
    throw new Error('Not able to get country data! ');
  }
  let countries = response.data;
  if (name) {
    countries = countries.filter((country: any) => country.name.common.toLowerCase().includes((name as string).toLowerCase()));
  }
  if (capital) {
    countries = countries.filter(
      (country: any) => country.capital && country.capital[0].toLowerCase().includes((capital as string).toLowerCase())
    );
  }
  if (region) {
    countries = countries.filter((country: any) => country.region === region);
  }
  if (timezone) {
    countries = countries.filter((country: any) => country.timezones.includes(timezone as string));
  }
  const countriesData = countries.map((country: any) => ({
    name: country.name.common,
    flag: country.flags.svg,
    region: country.region,
    population: country.population,
    currencies: country.currencies,
    timezones: country.timezones,
  }));

  if (countriesData && countriesData.length === 0) {
    throw new Error('No countries available! ');
  }

  //  Loging.
  //   console.log({
  //     desciption: 'info:searchCountries in services',
  //     data: countries,
  //     timestamp: new Date(),
  //   });

  return countriesData;
};

export default { getCountries, getCountryByCode, filterCountriesByRegion, searchCountries };
