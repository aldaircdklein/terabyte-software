import { Router } from 'express';
import MessageController from '../controllers/MessageController';

const messageController = new MessageController();
const messageRoute = Router();

messageRoute.get('/', messageController.index);
messageRoute.post('/', messageController.store);
messageRoute.put('/:messageId', messageController.update);
messageRoute.delete('/:messageId', messageController.delete);

export default messageRoute;
