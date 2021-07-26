import { IServiceOrder } from '@shared/models/dtos';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';
import ComputerModel from '@shared/models/ComputerModel';
import ICreateServiceRequest from '../dtos/ICreateServiceRequest';

export default class AddServiceOrder {
  async execute(
    data: ICreateServiceRequest,
    computerId: string
  ): Promise<IServiceOrder> {
    const service = await ServiceOrderModel.create(data);
    await ComputerModel.updateOne(
      { _id: computerId },
      {
        $push: { serviceOrders: service._id },
      }
    );
    return service;
  }
}
