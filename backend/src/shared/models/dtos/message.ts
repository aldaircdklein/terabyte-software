import { Document } from 'mongoose';

export default interface IMessage extends Document {
  status:boolean;
  message:string;
  createdAt: Date;
  updated: Date;
}
