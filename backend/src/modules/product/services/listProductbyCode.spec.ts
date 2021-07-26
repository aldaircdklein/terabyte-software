/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import ListProductByCode from './listProductByCode';
import factory from '@shared/tests/factories';
import { IProduct } from '@shared/models/dtos';

describe('List product', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should list a product', async () => {
    await factory.create<IProduct>('Product', { code: '123' });

    const listProductByCode = new ListProductByCode();

    const product = await listProductByCode.execute('123');

    expect(product[0].code).toEqual('123');
  });
});
*/