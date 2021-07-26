/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';

import {
  IProduct,
  IServiceOrder,
  ISold,
  IUser,
  IVehicle,
} from '@shared/models/dtos';
import ListVehicleByLicencePlate from './listVehicleByLicencePlate';

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
    const serviceOrder2 = await factory.create<IServiceOrder>('ServiceOrder');

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

    const sold = await factory.create<ISold>('Sold', {
      serviceOrder: serviceOrder2._id,
      items: [
        {
          product: product._id,
          quantity: 5,
        },
      ],
    });

    const vehicle = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [
        serviceOrder._id.toString(),
        serviceOrder2._id.toString(),
      ],
      licencePlate: 'KSK3590',
    });
    const vehicle2 = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [],
      licencePlate: 'KSK3888',
    });
    const user = await factory.create<IUser>('User', {
      vehicles: [vehicle._id.toString(), vehicle2._id],
      name: 'cleiton',
    });

    const listVehicleByLicencePlate = new ListVehicleByLicencePlate();

    const vehicles = await listVehicleByLicencePlate.execute(
      vehicle.licencePlate
    );
    // validate

    expect(vehicles).toHaveLength(1);
    expect(vehicles[0].licencePlate).toEqual(vehicle.licencePlate);
    expect(vehicles[0].user.name).toEqual(user.name);
    expect(vehicles[0].serviceOrders[0]._id).toEqual(serviceOrder._id);
    expect(vehicles[0].serviceOrders[0]).toHaveProperty('paid');
    expect(vehicles[0].serviceOrders[0]).toHaveProperty('paymentType');
    expect(vehicles[0].serviceOrders[0].sold).toHaveProperty('paymentType');
    expect(vehicles[0].serviceOrders[0].sold).toHaveProperty('paid');
    expect(vehicles[0].serviceOrders[0].sold).toHaveProperty('name');
  });
});
*/