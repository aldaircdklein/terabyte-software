import { Router } from 'express';
import ComputerController from '../controllers/ComputerController';

const computerController = new ComputerController();
const computerRouter = Router();

computerRouter.get('/:code', computerController.show);
computerRouter.post('/', computerController.store);
computerRouter.put('/:computerId', computerController.update);
computerRouter.delete('/:computerId', computerController.delete);

export default computerRouter;
