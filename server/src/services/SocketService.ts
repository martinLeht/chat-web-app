import { Namespace, Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { IMessageDTO } from '../dto/IMessageDTO';
import { INotificationDTO } from '../dto/INotificationDTO';
import ChatSocketHelper from './helpers/ChatSocketHelper';
import { id, inject, injectable } from 'inversify';
import ITempUserService from './interfaces/ITempUserService';
import TYPES from '../config/types';


@injectable()
class SocketService {

    private io: Server;
    private ioGeneralNamespace: Namespace;
    private chatSocketHelper: ChatSocketHelper;
    private tempUserService: ITempUserService;

    constructor(@inject(TYPES.ITempUserService) tempUserService: ITempUserService) {
        this.chatSocketHelper = new ChatSocketHelper();
        this.tempUserService = tempUserService;
    }

    public initSocketServer(httpServer: HttpServer): void {
        this.io = new Server(httpServer, {
            cors: {
              origin: "http://localhost:4200",
              methods: ["GET", "POST"]
            }
        });
        this.ioGeneralNamespace = this.io.of('/general');
        this.initSockets();
    }

    private initSockets(): void {
        this.ioGeneralNamespace.on('connect', (socket: Socket) => {
            this.ioGeneralNamespace.sockets.forEach((socket: Socket) => {
                console.log(socket.data.username);
                console.log(socket.id);
            });

            console.log("Client connected / Username: %s", JSON.stringify(socket.data.username));

            socket.on('direct_msg', (sendToSocketId: string, msg: IMessageDTO) => 
                this.chatSocketHelper.handleDirectMsg(socket, sendToSocketId, msg)
            );

            socket.on('direct_notification', (sendToSocketId: string, notification: INotificationDTO) => 
                this.chatSocketHelper.handleDirectNotification(socket, sendToSocketId, notification)
            );

            socket.on('disconnect', async () => { 
                const success: boolean = await this.tempUserService.deleteUser(socket.data.userId)
                if (success) {
                    console.log("Client disconnected / Username: %s", JSON.stringify(socket.data.username));
                }
            });
        });

        this.io.on('connect', (socket: Socket) => {
            console.log('Connected client');

            socket.on('notification', (notification: INotificationDTO) => {
                console.log('[server](notification): %s', JSON.stringify(notification));
                this.io.emit('notification', notification);
            });

            socket.on('message', (msg: IMessageDTO) => {
                console.log('[server](message): %s', JSON.stringify(msg));
                this.io.emit('message', msg);
            });
    
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

export default SocketService;