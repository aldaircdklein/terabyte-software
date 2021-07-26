import { ISold } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';
import SoldModel from '@shared/models/SoldModel';
import removeUndefined from '@shared/utils/removeUndefined';
import ICreateSoldRequest from '../dtos/ICreateSoldRequest';

export default class UpdateSold {
  async execute(data: ICreateSoldRequest, soldId: string): Promise<ISold> {
    const payload = {
      ...data,
      total: 0,
    };
    removeUndefined<typeof payload>(payload);
    for (const item of payload.items) {
      const product = await ProductModel.findOne({ _id: item.product });
      product.quantity -= item.quantity;
      payload.total += product.price * item.quantity;
      await product.save();
    }
    const sold = await SoldModel.findOneAndUpdate(
      { _id: soldId },
      { $set: payload },
      { new: true }
    );

    return sold;
  }
}
