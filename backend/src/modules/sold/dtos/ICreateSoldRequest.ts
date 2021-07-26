import { PaymentType } from '@shared/models/dtos';

export default interface ICreateSoldRequest {
  items: {
    product: string;
    quantity: number;
  }[];
  serviceOrder?: string;
  name?: string;
  paymentType?: PaymentType;
  paid?: boolean;
  observation?: string;
  code: string;
  discount?: number;
  partPayment?: number;
}
