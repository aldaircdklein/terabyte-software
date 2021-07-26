import { IComputer } from '@shared/models/dtos';
import ComputerModel from '@shared/models/ComputerModel';
import removeUndefined from '@shared/utils/removeUndefined';
import ICreateComputerRequest from '../dtos/ICreateComputerRequest';

export default class RegisterComputer {
  async execute(
    data: ICreateComputerRequest,
    computerId: string
  ): Promise<IComputer> {
    removeUndefined<typeof data>(data);
    const computer = await ComputerModel.findOneAndUpdate(
      { _id: computerId },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return computer;
  }
}
