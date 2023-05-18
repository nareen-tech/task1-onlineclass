import mongoose, { Schema } from 'mongoose';
import { body } from 'express-validator';
import UserInterface from '../interfaces/user';


const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    graduation: { type: String, required: false },
    verified: { type: Boolean, default: false },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'PROFESSOR'],
      default: 'USER',
    },
    status:{
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default:'INACTIVE',
    },
  },
  {
    timestamps: true,
  },
);



export default mongoose.model<UserInterface>('User', UserSchema);