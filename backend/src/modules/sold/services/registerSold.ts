import { ISold } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';
import SoldModel from '@shared/models/SoldModel';
import ICreateSoldRequest from '../dtos/ICreateSoldRequest';

export default class RegisterSold {
  async execute(data: ICreateSoldRequest): Promise<ISold> {
    const payload = {
      ...data,
      total: 0,
    };
    for (const item of payload.items) {
      const product = await ProductModel.findOne({ _id: item.product });
      product.quantity -= item.quantity;
      payload.total += product.price * item.quantity;
      await product.save();
    }

    const sold = await SoldModel.create(payload);

    return sold;
  }
}
