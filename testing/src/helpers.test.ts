import { SUPPORTED_COUNTRIES } from './config';
import { validateInput, shortenPublicHoliday } from './helpers';


describe('Helpers', () => {
  describe('validateInput', () => {

    it('should return true for supported countries and the current year', () => {
      const currentYear = new Date().getFullYear();
      const country = SUPPORTED_COUNTRIES[0]; 
      expect(validateInput({ year: currentYear, country })).toBeTruthy();
    });

    it('should throw an error for unsupported countries', () => {
      expect(() => {
        validateInput({ country: 'UnsupportedCountry' });
      }).toThrowError(new Error('Country provided is not supported, received: UnsupportedCountry'));
    });

    it('should throw an error for years that are not the current year', () => {
      expect(() => {
        validateInput({ year: new Date().getFullYear() + 1 });
      }).toThrowError(new Error(`Year provided not the current, received: ${new Date().getFullYear() + 1}`));
    });

  
    it('should return true if no parameters are provided', () => {
      expect(validateInput({})).toBeTruthy();
    });
  });

  describe('shortenPublicHoliday', () => {
  
    it('should return a shortened public holiday object', () => {
      const holiday = {
        name: 'HolidayName',
        localName: 'LocalHolidayName',
        date: '2023-09-26',
        fixed: false,
        global: true,
        counties: null,
        launchYear: 2023,
      };

      const expectedShortHoliday = {
        name: 'HolidayName',
        localName: 'LocalHolidayName',
        date: '2023-09-26',
      };

      expect(shortenPublicHoliday(holiday)).toEqual(expectedShortHoliday);
    });
  });
});