/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import UpdateProduct from './updateProduct';
import factory from '@shared/tests/factories'
import { IProduct } from '@shared/models/dtos';

describe('Update product', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should update a product', async () => {
    const oldProduct = await factory.create<IProduct>('Product')
    const payload={
      code: '1234',
      description: 'teste',
      application: 'teste3',
      quantity: 12,
      cost: 15.50,
      price: 20.50,
    }

    const updateProduct = new UpdateProduct();

    const product = await updateProduct.execute(payload,oldProduct._id)

    expect(product.code).toEqual(payload.code);
    expect(product.description).toEqual(payload.description);
    expect(product.application).toEqual(payload.application);
    expect(product.quantity).toEqual(payload.quantity);
    expect(product.cost).toEqual(payload.cost);
    expect(product.price).toEqual(payload.price);

  })  
});
*/