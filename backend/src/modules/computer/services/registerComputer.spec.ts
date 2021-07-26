/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories'
import RegisterVehicle from './registerVehicle';
import { IUser } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';


describe('Register Vehicle', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should register a vehicle', async () => {
    const user = await factory.create<IUser>('User',{vehicles:[]});

    const payload={
      licencePlate:'KSK3590'

    }
    const registerVehicle = new RegisterVehicle();

    const vehicle = await registerVehicle.execute(payload,user._id)

    expect(vehicle.licencePlate).toEqual(payload.licencePlate);

    const updatedUser = await UserModel.findOne({_id:user._id})

    expect(updatedUser.vehicles[0]).toEqual(vehicle._id)

  })  
});
*/