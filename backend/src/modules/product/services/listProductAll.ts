import { IProduct } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';

export default class ListProductAll {
  async execute(): Promise<IProduct[]> {
    const product = await ProductModel.find();

    return product;
  }
}
