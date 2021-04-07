import mongoose, { Schema } from 'mongoose';
import IUser from './interfaces/IUser';
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Mongo ODM to mapp to database
const UserSchema: Schema = new Schema({
    userId: { type: Number, required: true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    creationDateTime: { type: Date, default: Date.now },
    updatedDateTime: { type: Date }
});

// Enables autoincrementation to userId field
UserSchema.plugin(AutoIncrement, { id: 'user_id_seq', inc_field: 'userId' });

export default mongoose.model<IUser>('User', UserSchema);