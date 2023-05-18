import mongoose, { Schema } from 'mongoose';
import UserModel from './user';
import CategoryInterface from '../interfaces/category';


const CategorySchema: Schema = new Schema(
  {
    addedBY: { type: Schema.Types.ObjectId, ref: UserModel, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);




export default mongoose.model<CategoryInterface>('Category', CategorySchema);