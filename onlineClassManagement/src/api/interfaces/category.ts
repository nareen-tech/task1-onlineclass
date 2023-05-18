import { Document, ObjectId } from 'mongoose';

export default interface CategoryInterface extends Document {
  title: string;
  description: string;
}
