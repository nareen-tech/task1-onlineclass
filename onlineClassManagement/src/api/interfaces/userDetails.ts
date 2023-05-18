import { Document, ObjectId } from 'mongoose';

export default interface UserDetailsInterface extends Document {
  userId: ObjectId;
  courseId: ObjectId;
  joinedOn: Date;
}
