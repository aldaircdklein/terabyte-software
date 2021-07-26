/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from 'mongoose';

export async function openConnection() {
  if (!process.env.MONGO_URL) {
    throw new Error('MongoDb server not initializaded');
  }
  if (process.env.NODE_ENV === 'test')
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
}
export async function closeConnection() {
  await mongoose.connection.close();
}
