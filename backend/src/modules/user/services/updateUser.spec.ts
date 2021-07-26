/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories'
import UpdateUser from './updateUser';
import { IUser } from '@shared/models/dtos';


describe('Update user', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should update an user', async () => {
    const newUser = await factory.create<IUser>('User');

    const updateUser = new UpdateUser();

    const payload = {
      name:'Cleiton',
      phone:'22992726852',
      cpf:'17696391798'
    }

    const user = await updateUser.execute(payload, newUser._id.toString());
       
    expect(user.name).toEqual(payload.name);
    expect(user.phone).toEqual(payload.phone);
    expect(user.cpf).toEqual(payload.cpf);
  });
});
*/