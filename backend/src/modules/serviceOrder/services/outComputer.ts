import { IServiceOrder } from '@shared/models/dtos';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';

export default class OutComputerServiceOrder {
  async execute(serviceID: string): Promise<IServiceOrder> {
    const service = await ServiceOrderModel.findOneAndUpdate(
      { _id: serviceID },
      {
        $set: {
          out: true,
          outDate: new Date(),
        },
      },
      {
        new: true,
      }
    );
    return service;
  }
}
