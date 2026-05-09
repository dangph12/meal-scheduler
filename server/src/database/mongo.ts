import mongoose from 'mongoose';

const db = process.env.MONGO_URI as string;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB is Connected!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
