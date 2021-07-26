import AppError from '@shared/errors/AppError';
import { IProduct } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';
import removeUndefined from '@shared/utils/removeUndefined';
import ICreateProductRequest from '../dtos/ICreateProductRequest';

export default class UpdateProduct {
  async execute(
    data: ICreateProductRequest,
    productId: string
  ): Promise<IProduct> {
    removeUndefined<typeof data>(data);
    const codeAlreadyExists = await ProductModel.findOne({
      code: data.code,
      _id: { $ne: productId },
    });
    if (codeAlreadyExists) {
      throw new AppError('Code already exists');
    }
    const product = await ProductModel.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    return product;
  }
}
