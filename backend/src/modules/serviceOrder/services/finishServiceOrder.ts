import { IServiceOrder } from '@shared/models/dtos';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';

export default class FinishServiceOrder {
  async execute(serviceID: string): Promise<IServiceOrder> {
    const service = await ServiceOrderModel.findOneAndUpdate(
      { _id: serviceID },
      {
        $set: {
          finished: true,
          endDate: new Date(),
        },
      },
      {
        new: true,
      }
    );
    return service;
  }
}
