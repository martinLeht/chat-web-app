import { Document } from "mongoose";
import IMessage from "./IMessage";
import IUser from "./IUser";

interface IChatRoom extends Document {
    chatRoomId: number;
    users: IUser[];
    messages: IMessage[];
    creationDateTime: Date;
    updatedDateTime: Date;
}

export default IChatRoom;