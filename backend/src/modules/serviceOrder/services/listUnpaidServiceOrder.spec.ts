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
import ListUnpaid from './listUnpaidServiceOrder';
import { addDays, subDays } from 'date-fns';

describe('List unPaid service', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });
  const actualDate = new Date();

  it('Should List all unPaid services orders by period', async () => {
    const product = await factory.create<IProduct>('Product');
    const product2 = await factory.create<IProduct>('Product');
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder', {
      finished: true,
      endDate: actualDate,
      paid: true,
      createdAt: actualDate,
    });
    const serviceOrder2 = await factory.create<IServiceOrder>('ServiceOrder', {
      finished: false,
      endDate: actualDate,
      paid: false,
      createdAt: actualDate,
    });
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

    await factory.create<ISold>('Sold', {
      serviceOrder: serviceOrder2._id,
      items: [
        {
          product: product._id,
          quantity: 5,
        },
      ],
    });
    const vehicle = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [serviceOrder2._id.toString()],
      licencePlate: 'KSK3590',
    });
    const vehicle2 = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [serviceOrder._id.toString()],
      licencePlate: 'KSK3888',
    });
    const user = await factory.create<IUser>('User', {
      vehicles: [vehicle._id.toString(), vehicle2._id],
      name: 'cleiton',
    });

    const listUnpaid = new ListUnpaid();

    const response = await listUnpaid.execute(
      subDays(new Date(), 1),
      addDays(new Date(), 2)
    );
    // validate

    expect(response[0].vehicle.licencePlate).toEqual(vehicle.licencePlate);
    expect(response[0].user.name).toEqual(user.name);
    expect(response[0].serviceOrders).toHaveLength(1);
    expect(response[0].serviceOrders[0]._id).toEqual(serviceOrder2._id);
    expect(response[0].serviceOrders[0].paid).toBeFalsy();
  });
});
*/