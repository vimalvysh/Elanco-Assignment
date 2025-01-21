import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { dirname } from 'path';
// modules
import countreyService from '../services/countreyService';
import CustomErrorMessage from '../errors/CustomErrorMessage';

// Todo :  move to env.
const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/all';
const customError = new CustomErrorMessage();

// Get all countries
export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let countries = await countreyService.getCountries();
    //  Loging.
    console.log({
      desciption: 'info:getCountries controller',
      data: 'countries',
      timestamp: new Date(),
    });

    res.json({ success: true, data: countries });
  } catch (error) {
    const msg: string = customError.getErroMsg(error);

    //  Loging.
    const errorObj = {
      desciption: 'error: getCountries controller',
      data: error,
      timestamp: new Date(),
    };
    console.error(errorObj);
    throw new CustomErrorMessage({ code: 500, data: msg, logging: true });
  }
};

// Get country by code
export const getCountryByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    if (!code) {
      throw new CustomErrorMessage({ code: 400, data: 'Invalid code.', logging: true });
    }

    let countries = await countreyService.getCountryByCode(code);
    //  Loging.
    console.log({
      desciption: 'info:getCountryByCode controller',
      data: 'countries',
      timestamp: new Date(),
    });
    res.json({ success: true, data: countries });
  } catch (error: any) {
    //  Loging.
    const errorObj = {
      desciption: 'error: getCountryByCode controller',
      data: error,
      timestamp: new Date(),
    };
    console.error(errorObj);
    throw new CustomErrorMessage({ code: error.code, data: error.message, logging: true });
  }
};

// Filter countries by region
export const filterCountriesByRegion = async (req: Request, res: Response) => {
  try {
    const { region } = req.params;

    if (!region) {
      throw new CustomErrorMessage({ code: 400, data: 'Invalid region.', logging: true });
    }

    let countries = await countreyService.filterCountriesByRegion(region);
    //  Loging.
    console.log({
      desciption: 'info:filterCountriesByRegion controller',
      data: 'countries',
      timestamp: new Date(),
    });
    res.json({ success: true, data: countries });
  } catch (error: any) {
    //  Loging.
    const errorObj = {
      desciption: 'error: filterCountriesByRegion controller',
      data: error,
      timestamp: new Date(),
    };
    // console.error(errorObj);
    throw new CustomErrorMessage({ code: error.code, data: error.message, logging: true });
  }
};

// Search countries
export const searchCountries = async (req: Request, res: Response) => {
  try {
    let countries = await countreyService.searchCountries(req.query);
    //  Loging.
    console.log({
      desciption: 'info:searchCountries controller',
      data: countries,
      timestamp: new Date(),
    });
    res.json({ success: true, data: countries });
  } catch (error: any) {
    //  Loging.
    const errorObj = {
      desciption: 'error: searchCountries controller',
      data: error,
      timestamp: new Date(),
    };
    // console.error(errorObj);
    throw new CustomErrorMessage({ code: error.code, data: error.message, logging: true });
  }
};
