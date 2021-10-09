import AppError from '@shared/errors/AppError';
import { IMessage } from '@shared/models/dtos';
import MessageModel from '@shared/models/MessageModel';
import removeUndefined from '@shared/utils/removeUndefined';
import ICreateMessageRequest from '../dtos/ICreateMessageRequest';

export default class UpdateMessage {
  async execute(
    data: ICreateMessageRequest,
    messageId: string
  ): Promise<IMessage> {
    removeUndefined<typeof data>(data);
    
    const message = await MessageModel.findOneAndUpdate(
      {
        _id: messageId,
      },
      {
        $set: data,
      },
      {
        new: true,
      }
    );

    return message;
  }
}
