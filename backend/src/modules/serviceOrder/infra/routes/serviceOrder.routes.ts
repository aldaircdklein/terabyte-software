import { Router } from 'express';
import ServiceOrderController from '../controllers/ServiceOrderController';

const serviceOrderController = new ServiceOrderController();
const serviceOrderRoute = Router();

serviceOrderRoute.get('/', serviceOrderController.show);
serviceOrderRoute.get('/listbycode/:code', serviceOrderController.showByCode);
serviceOrderRoute.get('/listbydiagnostic/:diagnostic', serviceOrderController.showByDiagnostic);
serviceOrderRoute.get('/unpaid', serviceOrderController.index);
serviceOrderRoute.post('/', serviceOrderController.store);
serviceOrderRoute.patch('/:serviceOrderId', serviceOrderController.finish);
serviceOrderRoute.put('/:serviceOrderId', serviceOrderController.update);
serviceOrderRoute.delete('/:serviceOrderId', serviceOrderController.delete);

export default serviceOrderRoute;
