import mongoose, { Schema } from 'mongoose';
import UserDetailsInterface from '../interfaces/userDetails';
import UserModel from './user';
import CourseModel from './course';




const UserDetailsSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: UserModel, required: false },
    courseId: { type: Schema.Types.ObjectId, ref: CourseModel, required: false },
    joinedOn: { type: Date, required: false },
  },
  {
    timestamps: true,
  },
);




export default mongoose.model<UserDetailsInterface>('UserDetails', UserDetailsSchema);