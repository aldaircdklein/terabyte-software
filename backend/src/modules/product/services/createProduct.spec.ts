/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import CreateProduct from './createProduct';

describe('Register product', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should register a product', async () => {

    const payload={
      code: '1234',
      description: 'teste',
      application: 'teste3',
      quantity: 12,
      cost: 15.50,
      price: 20.50,
    }

    const createProduct = new CreateProduct();

    const product = await createProduct.execute(payload,)

    expect(product.code).toEqual(payload.code);
    expect(product.description).toEqual(payload.description);
    expect(product.application).toEqual(payload.application);
    expect(product.quantity).toEqual(payload.quantity);
    expect(product.cost).toEqual(payload.cost);
    expect(product.price).toEqual(payload.price);

  })  
});
*/