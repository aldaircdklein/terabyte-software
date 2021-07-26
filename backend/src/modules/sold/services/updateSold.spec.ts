/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import UpdateSold from './updateSold';
import {
  IProduct,
  IServiceOrder,
  ISold,
  PaymentType,
} from '@shared/models/dtos';

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

  it('Should update a sold', async () => {
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');
    const product1 = await factory.create<IProduct>('Product', { price: 10 });
    const sold = await factory.create<ISold>('Sold');

    const payload = {
      items: [
        {
          product: product1._id,
          quantity: 2,
        },
      ],
      serviceOrder: serviceOrder._id,
      paid: true,
      paymentType: PaymentType.CASH,
    };
    const updateSold = new UpdateSold();

    const updatedSold = await updateSold.execute(payload, sold._id);
    expect(updatedSold.total).toEqual(20);
    expect(updatedSold.paymentType).toEqual(payload.paymentType);
    expect(updatedSold.paid).toEqual(payload.paid);
  });
});
*/