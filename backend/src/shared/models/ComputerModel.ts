import { Schema, model } from 'mongoose';
import { IComputer } from './dtos';

import ServiceOrderModel from './ServiceOrderModel';

const ComputerSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    computerModel: {
      type: String,
      required: true,
    },
    serviceOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'service-order',
      },
    ],
  },
  {
    timestamps: true,
  }
);

ComputerSchema.post('findOneAndDelete', async (document: IComputer) => {
  if (document) {
    for (const id of document.serviceOrders) {
      await ServiceOrderModel.findOneAndDelete({ _id: id });
    }
  }
});

const ComputerModel = model<IComputer>('computer', ComputerSchema);

export default ComputerModel;
