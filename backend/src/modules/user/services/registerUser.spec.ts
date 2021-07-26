/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import RegisterUser from './registerUser';

describe('Create user', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should create an user', async () => {
    const payload = {
      name: 'Cleiton',
      phone: '992865120',
    };

    const registerUser = new RegisterUser();

    const user = await registerUser.execute(payload);

    expect(user.name).toEqual(payload.name);
  });
});
*/