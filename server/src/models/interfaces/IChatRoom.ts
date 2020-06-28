import { Document } from "mongoose";
import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChatRoom extends Document {
    chatRoomId: number;
    users: IUser[];
    messages: IMessage[];
    creationDateTime: Date;
    updatedDateTime: Date;
}