import mongoose from 'mongoose';

export function createConnection(): void {
  if (!(process.env.NODE_ENV === 'test')) {
    mongoose.connect(`${process.env.DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }
}
