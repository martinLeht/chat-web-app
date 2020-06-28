import { Document } from 'mongoose';
import { IUser } from './IUser';

export interface IMessage extends Document {
    messageId: number;
    user: IUser;
    creationDateTime: Date;
    updatedDateTime: Date;
}