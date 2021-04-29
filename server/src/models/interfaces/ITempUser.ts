import { Document } from 'mongoose';

interface ITempUser extends Document {
    userId: string;
    username: string;
    creationDateTime: Date;
    updateDateTime: Date;
}

export default ITempUser;