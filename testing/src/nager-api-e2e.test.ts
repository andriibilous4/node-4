const request = require('supertest');
const API_BASE_URL = 'https://date.nager.at/api/v3'; 

describe('Public Holidays API', () => {

  describe('/PublicHolidays/{year}/{countryCode}', () => {
    test('should return 200 and list of public holidays for a given year and country', async () => {
      const year = 2023;
      const countryCode = 'US';
      
      const { status, body } = await request(API_BASE_URL).get(`/PublicHolidays/${year}/${countryCode}`);
      
      expect(status).toEqual(200);
      expect(body).toBeInstanceOf(Array);
      body.forEach((holiday: any) => {
        expect(holiday).toEqual({
          date: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
        });
      });
    });
  });

  describe('/IsTodayPublicHoliday/{countryCode}', () => {
    test('should return 200 and boolean indicating if today is a public holiday', async () => {
      const countryCode = 'US';
      
      const { status, body } = await request(API_BASE_URL).get(`/IsTodayPublicHoliday/${countryCode}`);
      
      expect(status).toEqual(200);
      expect(typeof body).toBe('boolean');
    });
  });
});
