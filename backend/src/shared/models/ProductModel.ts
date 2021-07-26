import { Schema, model } from 'mongoose';
import ServiceOrderModel from './ServiceOrderModel';
import { IProduct } from './dtos';
import SoldModel from './SoldModel';

const ProductSchema = new Schema<IProduct>(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minStock: {
      type: Number,
    },
    cost: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.post('findOneAndDelete', async (document: IProduct) => {
  if (document) {
    await SoldModel.updateMany(
      { 'items.product': document._id },
      {
        $pull: { items: { product: document._id } },
      }
    );
  }
});

const ProductModel = model<IProduct>('product', ProductSchema);

export default ProductModel;
