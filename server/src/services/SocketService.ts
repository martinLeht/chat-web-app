import * as socketio from 'socket.io';
import { Server } from 'http';
import { Socket } from 'dgram';

export default class SocketService {

    private io: any;

    constructor(server: Server) {
        this.io = socketio.listen(server);

        this.setupSocketConfig();
    }

    private setupSocketConfig(): void {
        /* 'connection' is a socket.io event that is triggered when a new connection is 
       made. Once a connection is made, callback is called. */
        this.io.sockets.on('connection', (socket: Socket) => { /* socket object allows us to join specific clients 
            to chat rooms and also to catch
            and emit the events.*/
            // 'join event'
            socket.on('join', (data: any) => {          
                socket.join(data.room);
                chatRooms.find({}).toArray((err, rooms) => {
                    if(err){
                        console.log(err);
                        return false;
                    }
                    count = 0;
                    rooms.forEach((room) => {
                        if(room.name == data.room){
                        count++;
                        }
                    });
                    // Create the chatRoom if not already created
                    if(count == 0) {
                        chatRooms.insert({ name: data.room, messages: [] }); 
                    }
                });
            });
            // catching the message event
            socket.on('message', (data: any) => {
                // emitting the 'new message' event to the clients in that room
                io.in(data.room).emit('new message', {user: data.user, message: data.message});
                // save the message in the 'messages' array of that chat-room
                chatRooms.update({name: data.room}, { $push: { messages: { user: data.user, message: data.message } } }, (err, res) => {
                    if(err) {
                    console.log(err);
                    return false;
                    }
                });
            });
            // Event when a client is typing
            socket.on('typing', (data: any) => {
                // Broadcasting to all the users except the one typing 
                socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
            });
        });

    }

}