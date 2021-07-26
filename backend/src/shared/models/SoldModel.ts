import { Schema, model } from 'mongoose';
import { ISold, PaymentType } from './dtos';

const ItemsSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
});

const SoldSchema = new Schema(
  {
    code: {
      type: String,
      default: true,
    },
    observation: {
      type: String,
      default: false,
    },
    name: {
      type: String,
    },
    paymentType: {
      type: String,
      enum: PaymentType,
      default: PaymentType.ON_CREDIT,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    items: [ItemsSchema],
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
      default: 0.0
    },
    partPayment: {
      type: Number,
      required: false,
      default: 0.0
    },
    serviceOrder: {
      type: Schema.Types.ObjectId,
      ref: 'service-order',
    },
  },
  {
    timestamps: true,
  }
);

const SoldModel = model<ISold>('sold', SoldSchema);

export default SoldModel;
