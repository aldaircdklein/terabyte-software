import { IMessage } from '@shared/models/dtos';
import MessageModel from '@shared/models/MessageModel';
import ICreateMessageRequest from '../dtos/ICreateMessageRequest';

export default class CreateMessage {
  async execute(data: ICreateMessageRequest): Promise<IMessage> {
    const message = await MessageModel.create(data);

    return message;
  }
}
