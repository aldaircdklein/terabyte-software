/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import ServiceOrderModel from '@shared/models/UserModel';
import UserModel from '@shared/models/UserModel';
import VehicleModel from '@shared/models/ComputerModel';

import { IProduct, IServiceOrder, IUser, IVehicle } from '@shared/models/dtos';
import RemoveUser from './removeUser';

describe('Delete user', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should delete an user', async () => {
    const product = await factory.create<IProduct>('Product');
    const serviceOrder = await factory.create<IServiceOrder>('ServiceOrder');
    const vehicle = await factory.create<IVehicle>('Vehicle', {
      serviceOrders: [serviceOrder._id.toString()],
    });
    const user = await factory.create<IUser>('User', {
      vehicles: [vehicle._id.toString()],
    });

    const updateUser = new RemoveUser();

    await updateUser.execute(user._id.toString());
    // validate
    const updateOrder = await ServiceOrderModel.findOne({
      _id: serviceOrder._id,
    });
    const updateVehicle = await VehicleModel.findOne({ _id: vehicle._id });
    const updatedUser = await UserModel.findOne({ _id: user._id });

    expect(updateOrder).toBeNull();
    expect(updateVehicle).toBeNull();
    expect(updatedUser).toBeNull();
  });
});
*/