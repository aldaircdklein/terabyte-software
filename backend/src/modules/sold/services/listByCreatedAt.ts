import { ISold } from '@shared/models/dtos';
import SoldModel from '@shared/models/SoldModel';

type Match = {
  createdAt: { $gte: Date; $lte: Date };
  paid?: boolean;
};

type Match2 = {
  name?: { $regex: RegExp; $options: string };
};
type Match3 = {
  code?: { $regex: RegExp; $options: string };
};

export default class ListSold {
  async execute(
    startDate: string | Date,
    endDate: string | Date,
    name?: string,
    paid?: boolean
  ): Promise<ISold[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const match: Match = {
      createdAt: { $gte: start, $lte: end },
    };
    const match2: Match2 = {}
    const match3: Match3 = {}

    if (name) {
      match2.name = { $regex: new RegExp(name), $options: 'i' };
      match3.code = { $regex: new RegExp(name), $options: 'i' };
    }
    if (paid !== undefined) {
      match.paid = paid;
    }

    const sold = await SoldModel.find({
      $and: [
        {
          $or: [
            match2,
            match3
          ]
        },
        match
      ]
    })
      .populate('serviceOrder')
      .populate('items.product');
    return sold;
  }
}
