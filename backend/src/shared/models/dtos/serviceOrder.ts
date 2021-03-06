import { Document, Number } from 'mongoose';
import { PaymentType } from '.';

export default interface IServiceOrder extends Document {
  code: string;
  voltage: string;
  password?: string;
  energySource: string;
  missingScrew: boolean;
  calling: boolean;
  broken: boolean;
  open: boolean;
  observation?: string;
  backup?: boolean;
  handbag?: boolean;
  startDate: Date;
  endDate?: Date;
  problemDescription?: string;
  diagnostic?: string;
  serviceDescription?: string;
  finished?: boolean;
  servicePrice?: number;
  paymentType: PaymentType;
  paid: boolean;
  discount?: number;
  partPayment?: number;
  createdAt: Date;
  updated: Date;
}
