import { Router } from 'express';
import SoldController from '../controllers/SoldController';

const soldController = new SoldController();
const soldRouter = Router();

soldRouter.get('/', soldController.show);
soldRouter.post('/', soldController.store);
soldRouter.put('/:soldId', soldController.update);

export default soldRouter;
