import mongoose, { Schema } from 'mongoose';
import UserModel from './user';
import CategoryModel from './category';
import CourseInterface from '../interfaces/course';


const CourseSchema: Schema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: CategoryModel, required: true },
    professorId: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: UserModel, required: false },
    title : { type: String, required: true},
    duration: { type: String, required: false },
    mode: {
        type: String,
        enum: ['ONLINE', 'OFFLINE'],
        default: 'ONLINE'
      },
    topics: { type: Array, required: false },
  },
  {
    timestamps: true,
  },
);



export default mongoose.model<CourseInterface>('Course', CourseSchema);