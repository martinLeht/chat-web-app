import { Socket } from "socket.io";
import { IMessageDTO } from "../../dto/IMessageDTO";
import { INotificationDTO } from "../../dto/INotificationDTO";

class ChatSocketHelper {

    public handleDirectMsg(socketFrom: Socket, sendToSocketId: string, msgDto: IMessageDTO): void {
        console.log("-------------------Sending a direct message-------------------");
        console.log("FROM: " + socketFrom.data.username);
        console.log("TO (socketId): " + sendToSocketId);
        console.log("Message: %s", JSON.stringify(msgDto));
        socketFrom.to(sendToSocketId).emit('direct_msg', socketFrom.id, msgDto);
    }

    public handleDirectNotification(socketFrom: Socket, sendToSocketId: string, notificationDto: INotificationDTO): void {
        console.log("-------------------Sending a direct notification-------------------");
        console.log("FROM: " + socketFrom.data.username);
        console.log("TO (socketId): " + sendToSocketId);
        console.log("Message: %s", JSON.stringify(notificationDto));
        socketFrom.to(sendToSocketId).emit('direct_msg', socketFrom.id, notificationDto);
    }
}

export default ChatSocketHelper;