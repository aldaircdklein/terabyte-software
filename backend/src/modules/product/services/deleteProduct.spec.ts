/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import DeleteProduct from './deleteProduct';
import factory from '@shared/tests/factories';
import { IProduct, ISold } from '@shared/models/dtos';
import SoldModel from '@shared/models/SoldModel';

describe('Delete product', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should delete a product', async () => {
    const oldProduct = await factory.create<IProduct>('Product');
    const oldProduct2 = await factory.create<IProduct>('Product');

    const sold = await factory.create<ISold>('Sold', {
      items: [
        {
          product: oldProduct._id,
          quantity: 3,
        },
        {
          product: oldProduct2._id,
          quantity: 2,
        },
      ],
    });
    const deleteProduct = new DeleteProduct();

    await deleteProduct.execute(oldProduct._id);

    const updatedSold = await SoldModel.findOne({
      _id: sold._id,
    });

    expect(updatedSold.items).toHaveLength(1);
    expect(updatedSold.items[0].product).toEqual(oldProduct2._id);
  });
});
*/