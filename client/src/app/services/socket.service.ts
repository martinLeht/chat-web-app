import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../model/message';
import { Notification } from '../model/notification';
import { Event } from '../resources/event';



const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL + '/general');
  }

  public sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  public sendNotification(notification: Notification) {
    this.socket.emit('notification', notification);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observe => {
      this.socket.on('message', (data: Message) => observe.next(data));
    });
  }

  public onNotification(): Observable<Notification> {
    return new Observable<Notification>(observe => {
      this.socket.on('notification', (data: Notification) => observe.next(data));
    })
  }

  public onEvent(event: Event): Observable<Event> {
    return new Observable<Event>(observe => {
      this.socket.on(event, () => observe.next());
    });
  }

}
