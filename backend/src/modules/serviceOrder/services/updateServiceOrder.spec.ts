/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import UpdateServiceOrder from './updateServiceOrder';
import { IProduct, IServiceOrder, IComputer } from '@shared/models/dtos';
import VehicleModel from '@shared/models/ComputerModel';

describe('Update service order', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should update a service order', async () => {
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');
    const product = await factory.create<IProduct>('Product');

    const payload = {
      fullQuantity: 70,
      quilometres: 25000,
      startDate: new Date(),
    };
    const updateServiceOrder = new UpdateServiceOrder();

    const updatedServiceOrder = await updateServiceOrder.execute(
      payload,
      serviceOrder._id
    );

    expect(updatedServiceOrder.fullQuantity).toEqual(payload.fullQuantity);
    expect(updatedServiceOrder.quilometres).toEqual(payload.quilometres);
    expect(updatedServiceOrder.startDate).toEqual(payload.startDate);
  });
});*/
