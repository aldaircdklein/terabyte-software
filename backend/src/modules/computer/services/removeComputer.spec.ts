/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories'
import RemoveVehicle from './removeVehicle';
import { IVehicle } from '@shared/models/dtos';
import VehicleModel from '@shared/models/ComputerModel';



describe('Remove Vehicle', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should remove a vehicle', async () => {
    const vehicle = await factory.create<IVehicle>('Vehicle');

    const payload={
      licencePlate:'KSK3590',
      manufacturer:'Renault',
      vehicleModel:'Sandero'

    }
    const removeVehicle = new RemoveVehicle();

    await removeVehicle.execute(vehicle._id)

    const removedVehicle = await VehicleModel.findOne({_id: vehicle._id})
    expect(removedVehicle).toBeNull()

  

  })  
});
*/