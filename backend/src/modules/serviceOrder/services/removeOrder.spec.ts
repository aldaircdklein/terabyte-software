/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import RemoveServiceOrder from './removeServiceOrder';
import { IServiceOrder } from '@shared/models/dtos';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';

describe('Remove service order', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should remove a service order', async () => {
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');

    const removeServiceOrder = new RemoveServiceOrder();

    await removeServiceOrder.execute(serviceOrder._id);

    const removedServiceOrder = await ServiceOrderModel.findOne({
      _id: serviceOrder._id,
    });

    expect(removedServiceOrder).toBeNull();
  });
});
*/