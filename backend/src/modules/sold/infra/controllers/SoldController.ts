import RegisterSold from '@modules/sold/services/registerSold';
import UpdateSold from '@modules/sold/services/updateSold';
import ListSoldByCreatedAt from '@modules/sold/services/listByCreatedAt';

import { NextFunction, Request, Response } from 'express';

export default class SoldController {
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { startDate, endDate, name, paid } = request.query;

      const listSold = new ListSoldByCreatedAt();

      const usePaid = paid !== undefined;

      const paidBoolean = usePaid ? paid === 'true' : undefined;

      const sold = await listSold.execute(
        String(startDate),
        String(endDate),
        name ? String(name) : null,
        paidBoolean
      );
      return response.status(200).json(sold);
    } catch (error) {
      next(error);
    }
  }
  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const { items, serviceOrder, name, paymentType, paid, code, observation, discount, partPayment } = request.body;

      const registerSold = new RegisterSold();

      const sold = await registerSold.execute({
        items,
        serviceOrder,
        paymentType,
        name,
        paid,
        code,
        observation,
        discount,
        partPayment,
      });

      return response.status(200).json(sold);
    } catch (error) {
      next(error);
    }
  }
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { items, serviceOrder, name, paymentType, paid, code, observation, discount, partPayment } = request.body;
      const { soldId } = request.params;

      const updateSold = new UpdateSold();

      const sold = await updateSold.execute(
        {
          items,
          serviceOrder,
          name,
          paymentType,
          paid,
          code,
          observation,
          discount,
          partPayment,
        },
        soldId
      );

      return response.status(200).json(sold);
    } catch (error) {
      next(error);
    }
  }
}
