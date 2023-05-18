import { Request } from 'express';
import mongoose from 'mongoose';
import UserInterface from './user'; 

interface UserWithId extends UserInterface {
  _id: mongoose.Types.ObjectId;
}
export default interface UserTokenRequest extends Request {
  userDetails?: UserWithId;
}