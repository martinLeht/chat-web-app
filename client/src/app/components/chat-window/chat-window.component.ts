import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as uuid from 'uuid';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
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
  messageBody: string;
  ioConnection: any;

  messageFormData: FormGroup;
  isChatting = true;

  dialogRef: MatDialogRef<UserLoginDialogComponent> | null;

  constructor(
    private socketService: SocketService,
    private userStoreService: UserStoreService,
    public dialog: MatDialog) {
      this.messageFormData = new FormGroup({
        message: new FormControl()
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

    this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
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

  public sendMessage(messageData: any): void {
    if (!messageData && !messageData.message) return;

    console.log("Message sent --->")
    console.log(messageData.message);

    this.socketService.send({
      sender: this.user,
      body:messageData,
      creationTime: new Date()
    });
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        sender: this.user,
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        action: action,
        body: {
          username: this.user.username,
          previousUsername: params.previousUsername
        }
      }

      this.socketService.send(message);
    }
  }

  public getMessages() {
    return this.messages
  }

}
