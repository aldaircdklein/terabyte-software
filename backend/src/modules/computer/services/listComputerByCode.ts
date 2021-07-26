import ComputerModel from '@shared/models/ComputerModel';
import '@shared/models/ProductModel';

export default class ListComputerByCode {
  async execute(code: string): Promise<any[]> {
    const computers = await ComputerModel.aggregate()
      .match({
        code: { $regex: new RegExp(code), $options: 'i' },
      })
      .lookup({
        from: 'users',
        localField: '_id',
        foreignField: 'computers',
        as: 'user',
      })
      .unwind('user')
      .lookup({
        from: 'service-orders',
        let: { serviceOrder: '$serviceOrders' },
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
                      observation: '$observation',
                      code: '$code',
                      name: '$name',
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
                observation: '$sold._id.observation',
                code: '$sold._id.code',
                name: '$sold._id.name',
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
        as: 'serviceOrders',
      });

    return computers;
  }
}
