type Currency = {
  name: string;
  symbol: string;
};

type Currencies = {
  [key: string]: Currency;
};

export type Country = {
  name: string;
  flag: string;
  region: string;
  population: number;
  currencies: Currencies;
  timezones: string[];
};
