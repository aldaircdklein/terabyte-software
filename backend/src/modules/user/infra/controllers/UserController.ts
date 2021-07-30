import ListUser from '@modules/user/services/listUser';
import ListUserAll from '@modules/user/services/listUserAll';
import RegisterUser from '@modules/user/services/registerUser';
import RemoveUser from '@modules/user/services/removeUser';
import UpdateUser from '@modules/user/services/updateUser';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const listUserServiceAll = new ListUserAll();
      const users = await listUserServiceAll.execute();
      return response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.params;
      const listUserService = new ListUser();
      const users = await listUserService.execute(name);
      return response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, phone, email, cpf } = request.body;
      const registerUserService = new RegisterUser();
      const user = await registerUserService.execute({
        name,
        phone,
        email,
        cpf,
      });
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, phone, email, cpf } = request.body;
      const { userId } = request.params;
      const updateUserService = new UpdateUser();
      const user = await updateUserService.execute(
        {
          name,
          phone,
          email,
          cpf,
        },
        userId
      );
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.params;
      const removeUserService = new RemoveUser();
       await removeUserService.execute(userId);
      return response.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}
