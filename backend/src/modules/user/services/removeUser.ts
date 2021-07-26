import { IUser } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';
import { ICreateUserRequest } from '../dtos/ICreateUserRequest';

export default class RemoveUser {
  async execute(userId: string): Promise<void> {
    await UserModel.findOneAndDelete(
      { _id: userId },
    );
   
  }
}
