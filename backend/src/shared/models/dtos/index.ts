import IComputer from './computer';
import IUser from './user';
import IServiceOrder from './serviceOrder';
import IProduct from './product';
import ISold from './sold';
import IMessage from './message';

export enum PaymentType {
  CASH = 'cash',
  CREDIT = 'credit',
  DIVIDEDCREDIT = 'dividedcredit',
  DEBIT = 'debit',
  CHECK = 'check',
  PIX = 'pix',
  TRANSFER = 'transfer',
  ON_CREDIT = 'onCredit',
  CANCEL = 'cancel'
}
export { IComputer, IUser, IServiceOrder, IProduct, ISold, IMessage };
