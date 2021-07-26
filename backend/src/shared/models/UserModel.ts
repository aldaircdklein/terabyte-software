import { Schema, model } from 'mongoose';
import { IUser } from './dtos';
import ComputerModel from './ComputerModel';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    cpf: {
      type: String,
      required: false,
    },
    computers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'computer',
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.post('findOneAndDelete', async (document: IUser) => {
  if (document) {
    for (const id of document.computers) {
      await ComputerModel.findOneAndDelete({ _id: id });
    }
  }
});

const UserModel = model<IUser>('user', UserSchema);

export default UserModel;
