/* eslint-disable import/no-extraneous-dependencies */
/*import { factory } from 'factory-girl';
import faker from 'faker';

import UserModel from '@shared/models/UserModel';
import VehicleModel from '@shared/models/ComputerModel';
import ServiceOrderModel from '@shared/models/ServiceOrderModel';
import ProductModel from '@shared/models/ProductModel';
import SoldModel from '@shared/models/SoldModel';
import { PaymentType } from '@shared/models/dtos';

factory.define('Product', ProductModel, {
  code: faker.datatype.string(),
  description: faker.random.words(),
  application: faker.random.words(),
  quantity: faker.datatype.number(),
  cost: faker.datatype.number(),
  price: faker.datatype.number(),
});

factory.define('ServiceOrder', ServiceOrderModel, {
  fullQuantity: faker.datatype.number(),
  quilometres: faker.datatype.number(),
  startDate: faker.datatype.datetime(),
  problemDescription: faker.datatype.string(),
  diagnostic: faker.random.words(),
  serviceDescription: faker.random.words(),
  finished: false,
  endDate: null,
  paid: false,
  paymentType: PaymentType.CASH,
});

factory.define('Vehicle', VehicleModel, {
  licencePlate: faker.datatype.string(),
  manufacturer: faker.company.companyName(),
  vehicleModel: faker.name.findName(),
  year: '1999',
  dors: faker.datatype.number(),
  fuel: faker.name.findName(),
  steering: faker.name.findName(),
  air: faker.datatype.boolean(),
  color: faker.name.findName(),
  serviceOrders: [factory.assoc('ServiceOrder', '_id')],
});
factory.define('User', UserModel, {
  name: faker.internet.userName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  cpf: faker.name.findName(),
  rg: faker.name.findName(),
  address: {
    street: faker.address.streetName(),
    number: faker.datatype.number(),
    city: faker.address.city(),
    neighborhood: faker.address.city(),
  },
  vehicles: factory.assocMany('Vehicle', 2, '_id'),
});
factory.define('Sold', SoldModel, {
  total: faker.datatype.number(),
  items: [
    {
      product: factory.assoc('Product', '_id'),
      quantity: faker.datatype.number(),
    },
  ],
  paid: false,
  paymentType: PaymentType.CASH,
  name: faker.internet.userName(),
});

export default factory;
*/