import { IComputer } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';
import ComputerModel from '@shared/models/ComputerModel';
import ICreateComputerRequest from '../dtos/ICreateComputerRequest';

export default class RegisterComputer {
  async execute(
    data: ICreateComputerRequest,
    userId: string
  ): Promise<IComputer> {
    const computer = await ComputerModel.create(data);
    await UserModel.updateOne(
      { _id: userId },
      {
        $push: { computers: computer._id },
      }
    );
    return computer;
  }
}
