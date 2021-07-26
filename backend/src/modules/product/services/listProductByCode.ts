import { IProduct } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';

export default class ListProductByCode {
  async execute(codeDescription: string): Promise<IProduct[]> {
    const product = await ProductModel.find({
      $or: [
        { code: codeDescription },
        { name: { $regex: new RegExp(codeDescription), $options: 'i' } },
      ],
    });

    return product;
  }
}
