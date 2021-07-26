import { IComputer } from '@shared/models/dtos';
import ComputerModel from '@shared/models/ComputerModel';

export default class RegisterComputer {
  async execute(computerId: string): Promise<void> {
    await ComputerModel.findOneAndDelete({ _id: computerId });
  }
}
