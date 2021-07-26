import { IUser } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';
import { ICreateUserRequest } from '../dtos/ICreateUserRequest';

export default class RegisterUser {
  async execute(data: ICreateUserRequest): Promise<IUser> {
    const user = await UserModel.create(data);
    return user;
  }
}
