import { Document } from 'mongoose';
import { PaymentType } from '.';
import IProduct from './product';
import IServiceOrder from './serviceOrder';

export default interface ISold extends Document {
  items: {
    product: string | IProduct;
    quantity: number;
  }[];
  code: string;
  observation?: string;
  serviceOrder?: string | IServiceOrder;
  total: number;
  name?: string;
  paymentType: PaymentType;
  paid: boolean;
  discount?: number;
  partPayment?: number;
  createdAt: Date;
  updated: Date;
}
