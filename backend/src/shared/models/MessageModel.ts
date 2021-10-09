import { Schema, model } from 'mongoose';
import { IMessage } from './dtos';

const MessageSchema = new Schema<IMessage>(
  {
    status: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const MessageModel = model<IMessage>('message', MessageSchema);

export default MessageModel;
