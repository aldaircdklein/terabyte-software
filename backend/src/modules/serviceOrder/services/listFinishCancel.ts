import ComputerModel from '@shared/models/ComputerModel';
import { subDays } from 'date-fns';

export default class ListFinishCancel {
  async execute(finished = false) {
    const match = {
      'serviceOrders.finished': finished,
      'serviceOrders.paymentType':'cancel'
    };

    const computers = await ComputerModel.aggregate()
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
                      name: '$name',
                      observation: '$observation',
                      code: '$code',
                      discount: '$discount',
                      partPayment: '$partPayment'
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
                partPayment: '$sold._id.partPayment'
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
              out: 1,
              servicePrice: 1,
              paymentType: 1,
              paid: 1,
              discount: 1,
              partPayment: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ],
        as: 'serviceOrders',
      })
      .unwind({ path: '$serviceOrders', preserveNullAndEmptyArrays: true })
      .match(match)
      .group({
        _id: {
          _id: '$_id',
          code: '$code',
          computerModel: '$computerModel',
        },
        user: { $first: '$user' },
        serviceOrders: {
          $push: '$serviceOrders',
        },
      });
    const formattedComputer = computers.map((computer) => ({
      computer: computer._id,
      user: computer.user,
      serviceOrders: computer.serviceOrders,
    }));

    return formattedComputer;
  }
}
