/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories'
import AddServiceOrder from './addServiceOrder';
import { IComputer } from '@shared/models/dtos';
import ComputerModel from '@shared/models/ComputerModel';


describe('Register service order', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should register a service order', async () => {
    const computer = await factory.create<IComputer>('Computer',{serviceOrders:[]});

    const payload={
      startDate: new Date()
    }
    const addServiceOrder = new AddServiceOrder();

    const serviceOrder = await addServiceOrder.execute(payload,computer._id)

    expect(serviceOrder.startDate).toEqual(payload.startDate);

    const updatedVehicle = await VehicleModel.findOne({_id:vehicle._id})

   
    

    expect(updatedVehicle.serviceOrders[0]).toEqual(serviceOrder._id)

  })  
});
*/