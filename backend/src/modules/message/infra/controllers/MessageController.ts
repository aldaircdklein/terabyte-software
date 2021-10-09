import CreateMessage from '@modules/message/services/createMessage';
import UpdateMessage from '@modules/message/services/updateMessage';
import RemoveMessage from '@modules/message/services/deleteMessage';
import ListMessageAll from '@modules/message/services/listMessageAll';

import { NextFunction, Request, Response } from 'express';

export default class MessageController {
  async index(request: Request, response: Response, next: NextFunction){
    try {
      const listMessageAll = new ListMessageAll();

      const message = await listMessageAll.execute();

      return response.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        status,
        message,
      } = request.body;

      const createMessageService = new CreateMessage();

      const messages = await createMessageService.execute({
        message,
        status
      });

      return response.status(201).json(messages);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        message,
        status
      } = request.body;
      const { messageId } = request.params;
      const updateMessage = new UpdateMessage();
      const messages = await updateMessage.execute(
        {
          message,
          status
        },
        messageId
      );
      return response.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { messageId } = request.params;
      const removeMessage = new RemoveMessage();
      await removeMessage.execute(messageId);
      return response.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}
