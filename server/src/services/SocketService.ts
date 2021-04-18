import socketIo from 'socket.io';
import { Server } from 'http';
import { MessageDTO } from '../dto/MessageDTO';


class SocketService {

    private io: SocketIO.Server;

    constructor(server: Server) {
        this.io = socketIo(server);
    }

    public initSocket(): void {
        this.io.on('connect', (socket: any) => {
            console.log('Connected client');
            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });
    
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}

export default SocketService;