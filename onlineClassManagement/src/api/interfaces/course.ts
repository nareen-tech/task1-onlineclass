import { Document, ObjectId } from 'mongoose';

export default interface CourseInterface extends Document {
  categoryId: ObjectId;
  professorId: ObjectId;
  addedBy: ObjectId;
  duration: string;
  title: string;
  mode: string;
  topics: Array<String>;
}
