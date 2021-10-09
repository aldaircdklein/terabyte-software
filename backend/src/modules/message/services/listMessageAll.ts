import { IMessage } from '@shared/models/dtos';
import MessageModel from '@shared/models/MessageModel';

export default class ListMessageAll {
  async execute(): Promise<IMessage[]> {
    const message = await MessageModel.find();

    return message;
  }
}
