import { Socket } from "socket.io";
import { IMessageDTO } from "../../dto/IMessageDTO";
import { INotificationDTO } from "../../dto/INotificationDTO";
import { IAuthSocket } from "../interfaces/IAuthSocket";

class ChatSocketHelper {

    public static handleAuthorizedSocketConnected(socket: Socket): IAuthSocket {
        /* Set custom socket holding the username and userId */
        const authSocket: IAuthSocket = <IAuthSocket> socket;
        authSocket.username = socket.handshake.auth.username;
        authSocket.userId = socket.handshake.auth.userId;

        console.log("Client connected / Username: %s", JSON.stringify(authSocket.username));
        return authSocket;
    }

    public static handleDirectMsg(socketFrom: IAuthSocket, sendToSocketId: string, msgDto: IMessageDTO): void {
        console.log("-------------------Sending a direct message-------------------");
        console.log("FROM: " + socketFrom.username);
        console.log("TO (socketId): " + sendToSocketId);
        console.log("Message: %s", JSON.stringify(msgDto));
        socketFrom.to(sendToSocketId).emit('direct_msg', socketFrom.id, msgDto);
    }

    public static handleDirectNotification(socketFrom: IAuthSocket, sendToSocketId: string, notificationDto: INotificationDTO): void {
        console.log("-------------------Sending a direct notification-------------------");
        console.log("FROM: " + socketFrom.username);
        console.log("TO (socketId): " + sendToSocketId);
        console.log("Message: %s", JSON.stringify(notificationDto));
        socketFrom.to(sendToSocketId).emit('direct_msg', socketFrom.id, notificationDto);
    }
}

export default ChatSocketHelper;