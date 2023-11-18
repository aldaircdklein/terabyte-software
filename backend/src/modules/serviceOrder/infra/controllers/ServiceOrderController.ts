import AddServiceOrder from '@modules/serviceOrder/services/addServiceOrder';
import UpdateServiceOrder from '@modules/serviceOrder/services/updateServiceOrder';
import RemoveServiceOrder from '@modules/serviceOrder/services/removeServiceOrder';
import { NextFunction, Request, Response } from 'express';
import FinishServiceOrder from '@modules/serviceOrder/services/finishServiceOrder';
import OutComputerServiceOrder from '@modules/serviceOrder/services/outComputer';
import ListFinish from '@modules/serviceOrder/services/listFinish';
import ListServiceOrderByCode from '@modules/serviceOrder/services/listServiceOrderByCode';
import ListServiceOrderByDiagnostic from '@modules/serviceOrder/services/listServiceOrderByDiagnostic';
import ListUnpaid from '@modules/serviceOrder/services/listUnpaidServiceOrder';
import ListFinishNotOut from '@modules/serviceOrder/services/listFinishNotOut';
import ListFinishCancel from '@modules/serviceOrder/services/listFinishCancel';

export default class ServiceOrderController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { startDate, endDate, paid, searchMode } = request.query;

      const listUnpaid = new ListUnpaid();

      const usePaid = paid !== undefined;

      const paidBoolean = usePaid ? paid === 'true' : undefined;

      const result = await listUnpaid.execute(
        String(startDate),
        String(endDate),
        paidBoolean,
        String(searchMode),
      );
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async show(request: Request, response: Response, next: NextFunction) {
    try {
      const { finished } = request.query;

      const finishedBoolean = finished === 'true' ? true : false;

      const listFinish = new ListFinish();
      const result = await listFinish.execute(finishedBoolean);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async showNotOut(request: Request, response: Response, next: NextFunction) {
    try {
      const { finished } = request.query;

      const finishedBoolean = finished === 'true' ? true : false;

      const listFinish = new ListFinishNotOut();
      const result = await listFinish.execute(finishedBoolean);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async showFinishCancel(request: Request, response: Response, next: NextFunction) {
    try {
      const { finished } = request.query;

      const finishedBoolean = finished === 'true' ? true : false;

      const listFinish = new ListFinishCancel();
      const result = await listFinish.execute(finishedBoolean);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async showByCode(request: Request, response: Response, next: NextFunction) {
    try {
      const { code } = request.params;

      const listServiceOrderByCode = new ListServiceOrderByCode();
      const result = await listServiceOrderByCode.execute(code);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async showByDiagnostic(request: Request, response: Response, next: NextFunction) {
    try {
      const { diagnostic } = request.params;

      const listServiceOrderByDiagnostic = new ListServiceOrderByDiagnostic();
      const result = await listServiceOrderByDiagnostic.execute(diagnostic);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        voltage,
        password,
        energySource,
        missingScrew,
        calling,
        broken,
        open,
        observation,
        backup,
        handbag,
        startDate,
        endDate,
        problemDescription,
        diagnostic,
        serviceDescription,
        finished,
        servicePrice,
        paymentType,
        paid,
        computerId,
        discount,
        partPayment
      } = request.body;

      const addServiceOrderService = new AddServiceOrder();

      const serviceOrder = await addServiceOrderService.execute(
        {
          code,
          voltage,
          password,
          energySource,
          missingScrew,
          calling,
          broken,
          open,
          observation,
          backup,
          handbag,
          startDate,
          endDate,
          problemDescription,
          diagnostic,
          serviceDescription,
          finished,
          servicePrice,
          paymentType,
          paid,
          discount,
          partPayment
        },
        computerId
      );

      return response.status(200).json(serviceOrder);
    } catch (error) {
      next(error);
    }
  }

  async finish(request: Request, response: Response, next: NextFunction) {
    try {
      const { serviceOrderId } = request.params;

      const finishOrderService = new FinishServiceOrder();

      const serviceOrder = await finishOrderService.execute(serviceOrderId);

      return response.status(200).json(serviceOrder);
    } catch (error) {
      next(error);
    }
  }

  async outComputer(request: Request, response: Response, next: NextFunction) {
    try {
      const { serviceOrderId } = request.params;

      const outComputerOrderService = new OutComputerServiceOrder();

      const serviceOrder = await outComputerOrderService.execute(serviceOrderId);

      return response.status(200).json(serviceOrder);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        code,
        voltage,
        password,
        energySource,
        missingScrew,
        calling,
        broken,
        open,
        observation,
        backup,
        handbag,
        startDate,
        endDate,
        problemDescription,
        diagnostic,
        serviceDescription,
        finished,
        servicePrice,
        paymentType,
        paid,
        discount,
        partPayment
      } = request.body;
      const { serviceOrderId } = request.params;
      const updateComputerService = new UpdateServiceOrder();
      const serviceOrder = await updateComputerService.execute(
        {
          code,
          voltage,
          password,
          energySource,
          missingScrew,
          calling,
          broken,
          open,
          observation,
          backup,
          handbag,
          startDate,
          endDate,
          problemDescription,
          diagnostic,
          serviceDescription,
          finished,
          servicePrice,
          paymentType,
          paid,
          discount,
          partPayment
        },
        serviceOrderId
      );
      return response.status(200).json(serviceOrder);
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    try {
      const { serviceOrderId } = request.params;
      const removeOrderService = new RemoveServiceOrder();
      await removeOrderService.execute(serviceOrderId);
      return response.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}
