import AppError from '@shared/errors/AppError';
import { IProduct } from '@shared/models/dtos';
import ProductModel from '@shared/models/ProductModel';
import ICreateProductRequest from '../dtos/ICreateProductRequest';

export default class CreateProduct {
  async execute(data: ICreateProductRequest): Promise<IProduct> {
    const codeAlreadyExists = await ProductModel.findOne({ code: data.code });
    if (codeAlreadyExists) {
      throw new AppError('Code already exists');
    }
    const product = await ProductModel.create(data);

    return product;
  }
}
