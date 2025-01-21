import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all';
const API_COUNTRY = 'http://localhost:3001/countries/';

const COUNTRY = [
  {
    name: 'South Georgia',
    flag: 'https://flagcdn.com/gs.svg',
    region: 'Antarctic',
    population: 30,
    currencies: {
      SHP: {
        name: 'Saint Helena pound',
        symbol: '£',
      },
    },
    timezones: ['UTC-02:00'],
  },
  {
    name: 'Grenada',
    flag: 'https://flagcdn.com/gd.svg',
    region: 'Grenada',
    population: 112519,
    currencies: {
      XCD: {
        name: 'Eastern Caribbean dollar',
        symbol: '$',
      },
    },
    timezones: ['UTC-04:00'],
  },
  {
    name: 'Switzerland',
    flag: 'https://flagcdn.com/ch.svg',
    region: 'Europe',
    population: 8654622,
    currencies: {
      CHF: {
        name: 'Swiss franc',
        symbol: 'Fr.',
      },
    },
    timezones: ['UTC+01:00'],
  },
  {
    name: 'Sierra Leone',
    flag: 'https://flagcdn.com/sl.svg',
    region: 'Africa',
    population: 7976985,
    currencies: {
      SLL: {
        name: 'Sierra Leonean leone',
        symbol: 'Le',
      },
    },
    timezones: ['UTC'],
  },
  {
    name: 'Hungary',
    flag: 'https://flagcdn.com/hu.svg',
    region: 'Europe',
    population: 9749763,
    currencies: {
      HUF: {
        name: 'Hungarian forint',
        symbol: 'Ft',
      },
    },
    timezones: ['UTC+01:00'],
  },
];

export const getCountries = async () => {
  try {
    const response: any = { data: { success: true, data: [...COUNTRY] } };
    // const response = await axios.get(API_URL);
    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      // handle negative case.
      return [];
    }
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

type Currency = {
  name: string;
  symbol: string;
};
type Currencies = {
  [key: string]: Currency;
};
interface Country {
  name: string;
  flag: string;
  region: string;
  population: number;
  currencies: Currencies;
  timezones: string[];
}
// Function to fetch countries by region
export const getCountriesByRegion = async (filterTerm: string): Promise<Country[]> => {
  try {
    const response = await axios.get(`${API_COUNTRY}${filterTerm}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
