import { Document } from 'mongoose';
import IUser from './IUser';

interface IMessage extends Document {
    messageId: number;
    user: IUser;
    creationDateTime: Date;
    updatedDateTime: Date;
}

export default IMessage;