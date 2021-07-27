import CreateProduct from '@modules/product/services/createProduct';
import UpdateProduct from '@modules/product/services/updateProduct';
import RemoveProduct from '@modules/product/services/deleteProduct';
import ListProductByCode from '@modules/product/services/listProductByCode';
import ListProductAll from '@modules/product/services/listProductAll';

import { NextFunction, Request, Response } from 'express';

export default class ProductController {
  async index(request: Request, response: Response, next: NextFunction){
    try {
      const listProductAll = new ListProductAll();

      const product = await listProductAll.execute();

      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async show(request: Request, response: Response, next: NextFunction) {
    const { code } = request.params;
    try {
      const listProductByCode = new ListProductByCode();

      const product = await listProductByCode.execute(code);

      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        name,
        description,
        quantity,
        minStock,
        cost,
        price,
      } = request.body;

      const createProductService = new CreateProduct();

      const product = await createProductService.execute({
        code,
        name,
        description,
        quantity,
        cost,
        price,
        minStock,
      });

      return response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        name,
        description,
        quantity,
        cost,
        minStock,
        price,
      } = request.body;
      const { productId } = request.params;
      const updateProduct = new UpdateProduct();
      const product = await updateProduct.execute(
        {
          code,
          name,
          description,
          quantity,
          cost,
          price,
          minStock,
        },
        productId
      );
      return response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { productId } = request.params;
      const removeProduct = new RemoveProduct();
      await removeProduct.execute(productId);
      return response.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}
