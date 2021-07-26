import ListComputerByCode from '@modules/computer/services/listComputerByCode';
import RegisterComputer from '@modules/computer/services/registerComputer';
import RemoveComputer from '@modules/computer/services/removeComputer';
import UpdateComputer from '@modules/computer/services/updateComputer';
import { NextFunction, Request, Response } from 'express';

export default class ComputerController {
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { code } = request.params;

      const listComputerByCode = new ListComputerByCode();
      const computers = await listComputerByCode.execute(code);
      return response.status(200).json(computers);
    } catch (error) {
      next(error);
    }
  }
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        computerModel,
        userId,
      } = request.body;

      const registerComputerService = new RegisterComputer();

      const computer = await registerComputerService.execute(
        {
          code,
          computerModel,
        },
        userId
      );

      return response.status(200).json(computer);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        computerModel
      } = request.body;
      const { computerId } = request.params;
      const updateComputerService = new UpdateComputer();
      const computer = await updateComputerService.execute(
        {
          code,
          computerModel
        },
        computerId
      );
      return response.status(200).json(computer);
    } catch (error) {
      next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { computerId } = request.params;
      const removeComputerService = new RemoveComputer();
      await removeComputerService.execute(computerId);
      return response.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}
