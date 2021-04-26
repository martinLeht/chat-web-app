import { Server, ServerOptions, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { MessageDTO } from '../dto/MessageDTO';
import { NotificationDTO } from '../dto/NotificationDTO';


class SocketService {

    private io: Server;

    constructor(httpServer: HttpServer) {
        this.io = require("socket.io")(httpServer, {
            cors: {
              origin: "http://localhost:4200",
              methods: ["GET", "POST"]
            }
        });
    }

    public initSockets(): void {
        this.io.on('connect', (socket: Socket) => {
            console.log('Connected client');

            socket.on('notification', (notification: NotificationDTO) => {
                console.log('[server](notification): %s', JSON.stringify(notification));
                this.io.emit('notification', notification);
            });

            socket.on('message', (msg: MessageDTO) => {
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