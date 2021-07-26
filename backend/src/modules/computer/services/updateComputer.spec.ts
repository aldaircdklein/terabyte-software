/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories'
import UpdateVehicle from './updateVehicle';
import { IVehicle } from '@shared/models/dtos';



describe('update Vehicle', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should update a vehicle', async () => {
    const vehicle = await factory.create<IVehicle>('Vehicle');

    const payload={
      licencePlate:'KSK3590',
      manufacturer:'Renault',
      vehicleModel:'Sandero'

    }
    const updateVehicle = new UpdateVehicle();

    const updatedVehicle = await updateVehicle.execute(payload,vehicle._id)

    expect(updatedVehicle.licencePlate).toEqual(payload.licencePlate);
    expect(updatedVehicle.manufacturer).toEqual(payload.manufacturer);
    expect(updatedVehicle.vehicleModel).toEqual(payload.vehicleModel);

  

  })  
});
*/