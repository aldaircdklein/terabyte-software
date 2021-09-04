import { PaymentType } from '@shared/models/dtos';

export default interface ICreateServiceRequest {
  code: string;
  voltage: string;
  password: string;
  energySource: string;
  missingScrew: boolean;
  calling: boolean;
  broken: boolean;
  open: boolean;
  observation: string;
  backup?: boolean;
  handbag?: boolean;
  startDate: Date;
  endDate?: Date;
  outDate?: Date;
  problemDescription?: string;
  diagnostic?: string;
  serviceDescription?: string;
  finished?: boolean;
  out?: boolean;
  servicePrice?: number;
  paymentType: PaymentType;
  paid: boolean;
  discount?: number;
  partPayment?: number;
}
