import { IUser } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';
import removeUndefined from '@shared/utils/removeUndefined';
import { ICreateUserRequest } from '../dtos/ICreateUserRequest';

export default class UpdateUser {
  async execute(data: ICreateUserRequest, userId: string): Promise<IUser> {
    removeUndefined<typeof data>(data);
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return user;
  }
}
