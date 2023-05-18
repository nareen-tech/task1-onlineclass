import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const {
  MONGO_DBNAME,
  MONGODB_URL
} = process.env;

let MONGO_URL = MONGODB_URL + MONGO_DBNAME;


export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected successfully to ${MONGO_URL}`);
  } catch (err) {
    console.log('DB Connection Failed!');
  }
};


