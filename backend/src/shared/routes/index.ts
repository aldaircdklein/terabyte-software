import { Router } from 'express';
import userRouter from '@modules/user/infra/routes/users.routes';
import computerRouter from '@modules/computer/infra/routes/computer.routes';
import productRouter from '@modules/product/infra/routes/product.routes';
import serviceOrdersRouter from '@modules/serviceOrder/infra/routes/serviceOrder.routes';
import soldRouter from '@modules/sold/infra/routes/sold.routes';
import messageRouter from '@modules/message/infra/routes/message.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/computers', computerRouter);
routes.use('/products', productRouter);
routes.use('/service-orders', serviceOrdersRouter);
routes.use('/sold', soldRouter);
routes.use('/message', messageRouter);

export default routes;
