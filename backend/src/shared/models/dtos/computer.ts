import { Document } from 'mongoose';
import IServiceOrder from './serviceOrder';

export default interface IComputer extends Document {
  code: string;
  computerModel?: string;
  serviceOrders?: string[] | IServiceOrder[];
  createdAt: Date;
  updated: Date;
}
