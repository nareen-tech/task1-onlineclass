import { Document } from 'mongoose';

export default interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  gender: string;
  password: string;
  graduation: string;
  status: string;
  verified: Boolean;
}
