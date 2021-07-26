import { IUser } from '@shared/models/dtos';
import UserModel from '@shared/models/UserModel';
import ComputerModel from '@shared/models/ComputerModel';
import '@shared/models/ProductModel';

export default class ListUser {
  async execute(name: string): Promise<IUser[]> {
    const users = await UserModel.aggregate()
      .match({
        name: { $regex: new RegExp(name), $options: 'i' },
      })
      .lookup({
        from: 'computers',
        localField: 'computers',
        foreignField: '_id',
        as: 'computers',
      })
      .unwind({ path: '$computers', preserveNullAndEmptyArrays: true })
      .lookup({
        from: 'service-orders',
        let: {
          serviceOrder: {
            $cond: [
              { $isArray: '$computers.serviceOrders' },
              '$computers.serviceOrders',
              [],
            ],
          },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', '$$serviceOrder'],
              },
            },
          },
          {
            $lookup: {
              from: 'solds',
              let: { myId: '$_id' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ['$serviceOrder', '$$myId'],
                    },
                  },
                },
                {
                  $unwind: {
                    path: '$sold',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $unwind: {
                    path: '$items',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $lookup: {
                    from: 'products',
                    localField: 'items.product',
                    foreignField: '_id',
                    as: 'items.product',
                  },
                },
                {
                  $group: {
                    _id: {
                      id: '$_id',
                      total: '$total',
                      paymentType: '$paymentType',
                      paid: '$paid',
                      name: '$name',
                      observation: '$observation',
                      code: '$code',
                      discount: '$discount',
                      partPayment: '$partPayment',
                    },
                    items: {
                      $push: '$items',
                    },
                  },
                },
              ],
              as: 'sold',
            },
          },
          {
            $unwind: {
              path: '$sold',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $project: {
              sold: {
                items: '$sold.items',
                total: '$sold._id.total',
                _id: '$sold._id.id',
                paymentType: '$sold._id.paymentType',
                paid: '$sold._id.paid',
                name: '$sold._id.name',
                observation: '$sold._id.observation',
                code: '$sold._id.code',
                discount: '$sold._id.discount',
                partPayment: '$sold._id.partPayment',
              },
              code: 1,
              voltage: 1,
              password: 1,
              energySource: 1,
              missingScrew: 1,
              calling: 1,
              broken: 1,
              open: 1,
              observation: 1,
              backup: 1,
              handbag: 1,
              startDate: 1,
              endDate: 1,
              problemDescription: 1,
              diagnostic: 1,
              serviceDescription: 1,
              finished: 1,
              servicePrice: 1,
              paymentType: 1,
              paid: 1,
              discount: 1,
              partPayment: 1,
              createdAt: 1,
              updated: 1,
            },
          },
        ],
        as: 'computers.serviceOrders',
      })
      .group({
        _id: {
          _id: '$_id',
          name: '$name',
          phone: '$phone',
          email: '$email',
          cpf: '$cpf',
        },

        computers: {
          $push: '$computers',
        },
      });

    const formattedUsers = users.map((user) => ({
      ...user._id,
      computers: user.computers,
    }));

    return formattedUsers;
  }
}
