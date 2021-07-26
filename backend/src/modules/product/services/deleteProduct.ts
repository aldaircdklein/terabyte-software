import { IProduct } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';
import ICreateProductRequest from '../dtos/ICreateProductRequest';

export default class DeleteProduct {
  async execute(
    productId: string
  ): Promise<void> {
    await ProductModel.findOneAndDelete(
      {
        _id:productId
      })
  }
}
