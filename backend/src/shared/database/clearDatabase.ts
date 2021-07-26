import ProductModel from '../models/ProductModel';
import UserModel from '../models/UserModel';
import ServiceOrderModel from '../models/ServiceOrderModel';
import ComputerModel from '../models/ComputerModel';
import SoldModel from '../models/SoldModel';

export async function clearDatabase() {
  if (process.env.NODE_ENV === 'test') {
    await ProductModel.deleteMany({});
    await ServiceOrderModel.deleteMany({});
    await UserModel.deleteMany({});
    await ComputerModel.deleteMany({});
    await SoldModel.deleteMany({});
  } else {
    console.log('are you crazy bro?');
    return 'are you crazy bro?';
  }
}
