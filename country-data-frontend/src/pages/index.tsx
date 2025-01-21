import { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
// Services.
import { getCountries, getCountriesByRegion } from '../services/countryService';
// components.
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
const CountryCard = lazy(() => import('../components/CountryCard'));

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

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchCountries = async () => {
          try {
            const data = await getCountries();

            setCountries(data);
          } catch (error) {
            console.error('Failed to load countries.');
          }
        };

        fetchCountries();

        setLoading(false);
      } catch (err) {
        setError('Failed to load countries');
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // To get countries when filter changes.
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response: any = await getCountriesByRegion(filterTerm);
        if (response.data.success) {
          setCountries(response.data.data);
        } else {
          // Todo: Alert to show no countries.
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load countries');
        setLoading(false);
      }
    };
    if (filterTerm) {
      console.log('filterTerm-----', filterTerm);

      fetchCountries();
    }
  }, [filterTerm]);

  useEffect(() => {
    let filteredCountries = [];
    if (searchTerm.length === 0 && countries.length) {
      filteredCountries = [...countries];
    } else {
      filteredCountries = countries.filter((country: any) => country.name.includes(searchTerm));
    }
    setFilteredCountries([...filteredCountries]);
  }, [searchTerm, countries]);

  const handleSearch = (str: string) => {
    setSearchTerm(str);
  };

  const handleFilterChange = (str: string) => {
    setFilterTerm(str);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header>
        {/* Search Input */}
        <SearchBar onSearch={(str) => handleSearch(str)} />
        <FilterBar onFilterChnage={(str) => handleFilterChange(str)} />
      </Header>
      <div className="p-6">
        {/* Display filtered countries */}
        <div className="grid grid-cols-4 ">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country: Country) => (
              <Suspense fallback={<div>Loading CountryCard...</div>} key={country.name}>
                <CountryCard
                  flag={country.flag}
                  name={country.name}
                  capital="Ind"
                  population={country.population}
                  region={country.region}
                ></CountryCard>
              </Suspense>
            ))
          ) : (
            <p className="text-gray-500">No countries found.</p>
          )}
        </div>
      </div>
    </>
  );
}
