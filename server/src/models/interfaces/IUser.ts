import { Document } from 'mongoose';

interface IUser extends Document {
    userId: number;
    username: string;
    email: string;
    password: string;
    creationDateTime: Date;
    updatedDateTime: Date;
}

export default IUser;