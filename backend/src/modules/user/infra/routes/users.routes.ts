import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', userController.index);
userRouter.get('/:name', userController.show);
userRouter.post('/', userController.store);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userController.delete);

export default userRouter;
