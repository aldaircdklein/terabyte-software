/*import {
  closeConnection,
  openConnection,
} from '@shared/database/testConnection';
import { clearDatabase } from '@shared/database/clearDatabase';
import factory from '@shared/tests/factories';
import ListByCreatedAt from './listByCreatedAt';
import { ISold } from '@shared/models/dtos';
import { addDays, subDays } from 'date-fns';

describe('List Sold', () => {
  beforeAll(() => {
    openConnection();
  });
  afterAll(() => {
    closeConnection();
  });
  beforeEach(async () => {
    await clearDatabase();
  });

  it('Should list a sold by a time period', async () => {
    const sold = await factory.create<ISold>('Sold', {
      createdAt: new Date(),
    });

    const listByCreatedAt = new ListByCreatedAt();

    const solds = await listByCreatedAt.execute(
      subDays(new Date(), 1),
      addDays(new Date(), 2)
    );

    expect(solds).toHaveLength(1);
  });

  it('Should list a sold by a name and paid', async () => {
    await factory.create<ISold>('Sold', {
      createdAt: new Date(),
      name: 'cleiton',
      paid: false,
    });
    await factory.create<ISold>('Sold', {
      createdAt: new Date(),
      name: 'joão',
      paid: false,
    });
    await factory.create<ISold>('Sold', {
      createdAt: new Date(),
      name: 'cleiton',
      paid: true,
    });

    const listByCreatedAt = new ListByCreatedAt();

    const solds = await listByCreatedAt.execute(
      subDays(new Date(), 1),
      addDays(new Date(), 2),
      'clei',
      false
    );

    expect(solds).toHaveLength(1);
    expect(solds[0].name).toEqual('cleiton');
    expect(solds[0].paid).toBeFalsy();
  });
});
*/