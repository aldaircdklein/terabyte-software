import { Document } from 'mongoose';
import IComputer from './computer';

export default interface IUser extends Document {
  name: string;
  phone?: string;
  email?: string;
  cpf?: string;
  computers?: string[] | IComputer[];
  createdAt: Date;
  updated: Date;
}
