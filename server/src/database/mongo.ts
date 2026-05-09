import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const db = process.env.MONGO_URI;
  if (!db) {
    throw new Error('MONGO_URI is not set');
  }

  try {
    await mongoose.connect(db);
    console.log('MongoDB is Connected!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
