import axios from 'axios';

import { PUBLIC_HOLIDAYS_API_URL } from '../config';

import {getListOfPublicHolidays,
   checkIfTodayIsPublicHoliday,
    getNextPublicHolidays
  } from './public-holidays.service';
import { shortenPublicHoliday } from '../helpers';


jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Public Holidays Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
});

describe('getListOfPublicHolidays', () => {
  it('should return a list of public holidays', async() => {
    const data = [
      {date: '2023-01-01', name: 'New Year', countryCode: 'US'}
    ];

    mockedAxios.get.mockResolvedValueOnce({data});

    const result = await getListOfPublicHolidays(2023,'US');

    expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/US`);
    expect(result).toEqual(data.map(holiday => shortenPublicHoliday(holiday)));

  })
});

describe('checkIfTodayIsPublicHoliday', () => {
  it('should return true if today is a public holiday', async () => {
    mockedAxios.get.mockResolvedValueOnce({status: 200});

    const country = 'US';

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);

    expect(result).toBe(true);

  })

  it('should return empty array on error', async () =>{
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));
    const result = checkIfTodayIsPublicHoliday('US');

    expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/US`);
    expect(result).toEqual([]);
  })
});

describe('getNextPublicHolidays', () => {
  it('should return a list of the next public holidays', async () => {
    const country = 'US';

    const data = [
      {date: '2022-01-01', name: 'New Year', countryCode: country}
    ];

    mockedAxios.get.mockResolvedValueOnce({data})

    const result = await getNextPublicHolidays(country);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
    expect(result).toEqual(data);
  })

  it('should return empty array on error', async () =>{
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const result = await getNextPublicHolidays('US');

    expect(mockedAxios.get).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/US`);
    expect(result).toEqual([]);
  })
})




