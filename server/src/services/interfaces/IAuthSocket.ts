import { Socket } from "socket.io";

export interface IAuthSocket extends Socket {
    username: string;
    userId: string;
}