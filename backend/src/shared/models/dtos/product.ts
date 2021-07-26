import { Document } from 'mongoose';

export default interface IProduct extends Document {
  code: string;
  name: string;
  description: string;
  quantity: number;
  minStock?: number;
  cost: number;
  price: number;
  createdAt: Date;
  updated: Date;
}
