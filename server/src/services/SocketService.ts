import { Namespace, Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { IMessageDTO } from '../dto/IMessageDTO';
import { INotificationDTO } from '../dto/INotificationDTO';
import ChatSocketHelper from './helpers/ChatSocketHelper';
import { id, inject, injectable } from 'inversify';
import ITempUserService from './interfaces/ITempUserService';
import TYPES from '../config/types';
import { ITempUserDTO } from '../dto/ITempUserDTO';
import { NextFunction } from 'express';
import { IAuthSocket } from './interfaces/IAuthSocket';


@injectable()
class SocketService {

    private io: Server;
    private ioGeneralNamespace: Namespace | undefined;
    private tempUserService: ITempUserService;

    constructor(@inject(TYPES.ITempUserService) tempUserService: ITempUserService) {
        this.io = new Server();
        this.tempUserService = tempUserService;
    }

    public initSocketServer(httpServer: HttpServer): void {
        this.io.attach(httpServer, {
            cors: {
              origin: "http://localhost:4200",
              methods: ["GET", "POST"]
            }
        });
        this.ioGeneralNamespace = this.io.of('/general');
        this.initSocketMiddlewares();
        this.initSockets();
    }

    private initSocketMiddlewares(): void {
        //if (this.ioGeneralNamespace !== undefined) {
            this.io.use((socket: Socket, next) => {
                console.log("SOCKET MIDDLEWARE");
                /* Check for username and userId */
                const username: string = socket.handshake.auth.username;
                const userId: string = socket.handshake.auth.userId;
                console.log(socket.handshake);
                if (!username || !userId) {
                    console.log("ERROR in socket middleware");
                    return next(new Error("Invalid username or userId"));
                }
                console.log("Proceeding NEXT from middleware");
                next();
            });
        //}
        
    }

    private initSockets(): void {
        //if (this.ioGeneralNamespace !== undefined) {
            this.io.on('connect', (socket: Socket) => {
            
                const authSocket: IAuthSocket = ChatSocketHelper.handleAuthorizedSocketConnected(socket);
                console.log("In socket connected");

                if (this.ioGeneralNamespace !== undefined) {
                    this.ioGeneralNamespace.sockets.forEach((socket: Socket) => {
                        const authSocket: IAuthSocket = <IAuthSocket> socket;
                        console.log(authSocket.username);
                        console.log(authSocket.userId);
                    });
                }

                authSocket.on('direct_msg', (sendToSocketId: string, msg: IMessageDTO) => 
                    ChatSocketHelper.handleDirectMsg(authSocket, sendToSocketId, msg)
                );

                authSocket.on('direct_notification', (sendToSocketId: string, notification: INotificationDTO) => 
                    ChatSocketHelper.handleDirectNotification(authSocket, sendToSocketId, notification)
                );

                authSocket.on('disconnect', async () => { 
                    const success: boolean = await this.tempUserService.deleteUser(authSocket.userId)
                    if (success) {
                        console.log("Client disconnected / Username: %s", JSON.stringify(authSocket.username));
                        authSocket.emit('disconnect');
                    } else {
                        console.log("Something went wrong on disconnect...");
                    }
                });

                socket.on('error', (err: Error) => {
                    if (err && err.message === "unauthorized event") {
                        socket.disconnect();
                    }
                });
            });
        //}
        

        /*
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
        */
    }
}

export default SocketService;