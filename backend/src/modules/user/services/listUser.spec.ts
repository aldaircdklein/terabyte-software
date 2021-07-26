/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';

import {
  IProduct,
  IServiceOrder,
  IUser,
  IVehicle,
  ISold,
} from '@shared/models/dtos';
import ListUser from './listUser';

describe('List user', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should List an user', async () => {
    const product = await factory.create<IProduct>('Product');
    const product2 = await factory.create<IProduct>('Product');
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');
    await factory.create<ISold>('Sold', {
      serviceOrder: serviceOrder._id,
      items: [
        {
          product: product._id,
          quantity: 3,
        },
        {
          product: product2._id,
          quantity: 2,
        },
      ],
    });

    const vehicle = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [serviceOrder._id.toString()],
      licencePlate: '12345',
    });
    const vehicle2 = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [],
    });
    const user = await factory.create<IUser>('User', {
      vehicles: [vehicle._id.toString(), vehicle2._id],
      name: 'cleiton',
    });

    const listUser = new ListUser();

    const users = await listUser.execute(user.name);
    // validate

    expect(users[0].name).toEqual(user.name);
    expect((<IVehicle>users[0].vehicles[0]).licencePlate).toEqual(
      vehicle.licencePlate
    );
  });
});
*/