import { Document } from 'mongoose';

export interface IUser extends Document {
    userId: number;
    username: string;
    email: string;
    password: string;
}