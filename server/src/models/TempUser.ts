import mongoose, { Schema } from 'mongoose';
import * as MUUID from 'uuid-mongodb';
import ITempUser from './interfaces/ITempUser';

// Mongo ODM to mapp to database
const TempUserSchema: Schema = new Schema({
    userId: { 
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
        required: true,
        unique: true,
        index: true,
    },
    username: { type: String, required: true },
    creationDateTime: { type: Date, default: Date.now },
    updateDateTime: { type: Date }
});


export default mongoose.model<ITempUser>('TempUser', TempUserSchema);