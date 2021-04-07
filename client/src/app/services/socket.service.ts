import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io';
import { Message } from '../model/message';


const SERVER_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(msg: Message) {
    this.socket.emit('message', msg);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observe => {
      this.socket.on('message', (data: Message) => observe.next(data));
    });
  }

  public onEvent(event: Event): Observable<Event> {
    return new Observable<Event>(observe => {
      this.socket.on(event, () => observe.next());
    });
  }

}
