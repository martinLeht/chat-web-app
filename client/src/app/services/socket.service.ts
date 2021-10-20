import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { Message } from '../model/message';
import { Notification } from '../model/notification';
import { User } from '../model/user';
import { Event } from '../resources/event';

const SERVER_URL = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  public initSocket(user: User): void {
    console.log("Initialising IO");
    this.socket = io(SERVER_URL, {
      auth: { 
        username: user.username,
        userId: user.userId 
      }
    });
  }

  public sendMessage(msg: Message) {
    this.socket.emit('message', msg);
  }

  public sendDirectMessage(msg: Message) {
    this.socket.emit('direct_msg', msg);
  }

  public sendNotification(notification: Notification) {
    this.socket.emit('notification', notification);
  }

  public sendDirectNotification(notification: Notification) {
    this.socket.emit('direct_notification', notification);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observe => {
      this.socket.on('direct_message', (data: Message) => observe.next(data));
    });
  }

  public onNotification(): Observable<Notification> {
    return new Observable<Notification>(observe => {
      this.socket.on('direct_notification', (data: Notification) => observe.next(data));
    })
  }

  public onEvent(event: Event): Observable<Event> {
    return new Observable<Event>(observe => {
      this.socket.on(event, () => observe.next());
    });
  }

}
