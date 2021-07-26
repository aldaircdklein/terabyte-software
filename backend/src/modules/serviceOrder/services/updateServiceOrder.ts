import { IServiceOrder } from '@shared/models/dtos';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';
import removeUndefined from '@shared/utils/removeUndefined';
import ICreateServiceRequest from '../dtos/ICreateServiceRequest';

export default class UpdateServiceOrder {
  async execute(
    data: ICreateServiceRequest,
    serviceID: string
  ): Promise<IServiceOrder> {
    removeUndefined<typeof data>(data);
    const service = await ServiceOrderModel.findOneAndUpdate(
      { _id: serviceID },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return service;
  }
}
