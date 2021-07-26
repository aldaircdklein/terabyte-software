import ServiceOrderModel from '@shared/models/ServiceOrderModel';
import ICreateServiceRequest from '../dtos/ICreateServiceRequest';

export default class RemoveServiceOrder {
  async execute(
    serviceID: string
  ): Promise<void> {
    await ServiceOrderModel.deleteOne(
      { _id: serviceID },
     
    );
    
  }
}
