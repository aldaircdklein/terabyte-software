/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import RegisterSold from './registerSold';
import { IProduct, IServiceOrder } from '@shared/models/dtos';
import VehicleModel from '@shared/models/ComputerModel';

describe('Register Sold', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should register a sold', async () => {
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');
    const product1 = await factory.create<IProduct>('Product', { price: 10 });
    const product2 = await factory.create<IProduct>('Product', { price: 15.5 });

    const payload = {
      items: [
        {
          product: product1._id,
          quantity: 2,
        },
        {
          product: product2._id,
          quantity: 1,
        },
      ],
      serviceOrder: serviceOrder._id,
    };
    const registerSold = new RegisterSold();

    const sold = await registerSold.execute(payload);
    expect(sold.total).toEqual(35.5);
  });
});
*/