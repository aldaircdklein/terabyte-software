import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productController = new ProductController();
const productRoute = Router();

productRoute.get('/:code', productController.show);
productRoute.post('/', productController.store);
productRoute.put('/:productId', productController.update);
productRoute.delete('/:productId', productController.delete);

export default productRoute;
