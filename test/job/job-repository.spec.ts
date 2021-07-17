import { reset } from 'testdouble';
import { Client } from '../../src/core/client';

const username = 'test';
const password = 'test';

// beforeEach(async () => {
//   ({ axios, Client } = await defaultMocks());
// });

afterEach(() => {
  reset();
});

describe('search jobs', () => {
  it('should fetch company jobs', async () => {
    const reqParams = {
      companyId: 1035,
      skip: 0,
      limit: 25,
    };

    const client = await new Client().login.userPass({ username, password });

    const jobsSearch = await client.job.searchAll(reqParams);
    const jobs = await jobsSearch.scrollNext();

    expect(typeof client.job.getCount()).toBe('number');
  });

})