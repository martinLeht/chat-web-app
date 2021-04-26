import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as uuid from 'uuid';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { Notification } from 'src/app/model/notification';
import { SocketService } from 'src/app/services/socket.service';
import { Action } from '../../resources/action';
import { Event } from '../../resources/event';
import { UserLoginDialogComponent } from '../user-login-dialog/user-login-dialog.component';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  action = Action;
  user: User;
  storedUsername: string;
  messages: Message[] = [];
  notifications: Notification[] = [];
  messageBody: string;
  ioConnection: any;

  messageForm: FormGroup;
  isChatting = true;

  dialogRef: MatDialogRef<UserLoginDialogComponent> | null;

  constructor(
    private socketService: SocketService,
    private userStoreService: UserStoreService,
    public dialog: MatDialog) {
    this.messageForm = new FormGroup({
      message: new FormControl(this.messageBody, [
        Validators.required,
        Validators.minLength(1)
      ])
    });
  }

  ngOnInit() {
    this.initUser();

    setTimeout(() => {
      this.openUserLoginDialog()
    }, 0);
  }


  private initUser(): void {
    const tempUuid = uuid.v4();

    this.user = {
      uuid: tempUuid
    }
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
    });

    this.socketService.onNotification()
      .subscribe((notification: Notification) => {
        this.notifications.push(notification);
    });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log("Connected");
    });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log("Disconnected");
    });

  }

  public openUserLoginDialog(): void {
    this.dialogRef = this.dialog.open(UserLoginDialogComponent, {
      data: { username: this.user.username}
    });

    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }
      this.storedUsername = this.userStoreService.getStoredUser();

      this.user.username = paramsDialog.username;
      this.userStoreService.storeUser(this.user.username);
      this.initIoConnection();
      this.sendNotification(paramsDialog, Action.JOINED);
    });
  }

  public isLoggedIn(): boolean {
    if (this.user != null) {
          
    }
    return false;
  }

  public sendMessage(): void {
    if (this.messageForm.valid) return;

    let message: Message = {
      sender: this.user,
      body: this.messageForm.get('message').value,
      creationTime: new Date()
    };

    this.socketService.sendMessage(message);
    this.messageForm.reset();
  }

  public sendNotification(params: any, action: Action): void {
    let notification: Notification;
    let info: string;

    if (action === Action.JOINED) {
      info = "joined to the chat";
      notification = {
        from: this.user,
        action: action,
        info: info
      };
      this.socketService.sendNotification(notification);
    } else if (action === Action.RENAME) {
      info = "Changed username to " + this.user.username;
      notification = {
        from: this.user,
        action: action,
        info: info
      };
      this.socketService.sendNotification(notification);
    }
  }

  public getMessages() {
    return this.messages
  }

}
