import { Schema, model } from 'mongoose';
import { IServiceOrder, PaymentType } from './dtos';

const ServiceOrderSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    voltage: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    energySource: {
      type: String,
      required: true,
    },
    missingScrew: {
      type: Boolean,
      required: true,
    },
    calling: {
      type: Boolean,
      required: true,
    },
    broken: {
      type: Boolean,
      required: true,
    },
    open: {
      type: Boolean,
      required: true,
    },
    observation: {
      type: String,
      required: false,
    },
    backup: {
      type: Boolean,
      required: false,
    },
    handbag: {
      type: Boolean,
      required: false,
    },
    startDate: {
      type: Date,
      default: new Date(),
    },
    problemDescription: {
      type: String,
      required: false,
    },
    diagnostic: {
      type: String,
      required: false,
    },
    serviceDescription: {
      type: String,
      required: false,
    },
    servicePrice: Number,

    finished: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: Date,
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
    discount: {
      type: Number,
      required: false,
      default: 0.0
    },
    partPayment: {
      type: Number,
      required: false,
      default: 0.0
    }
  },
  {
    timestamps: true,
  }
);

const ServiceOderModel = model<IServiceOrder>(
  'service-order',
  ServiceOrderSchema
);

export default ServiceOderModel;
