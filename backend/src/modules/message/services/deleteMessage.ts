import { IMessage } from '@shared/models/dtos';
import MessageModel from '@shared/models/MessageModel';
import ICreateMessageRequest from '../dtos/ICreateMessageRequest';

export default class DeleteMessage {
  async execute(
    messageId: string
  ): Promise<void> {
    await MessageModel.findOneAndDelete(
      {
        _id:messageId
      })
  }
}
