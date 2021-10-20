import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { User } from 'src/app/model/user';
import { SocketService } from 'src/app/services/socket.service';
import { TempUserService } from 'src/app/services/temp-user.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Event } from 'src/app/resources/event';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css']
})
export class UsersOnlineComponent implements OnInit {

  @Output() chatWithUserEvent = new EventEmitter<User>();

  isLoggedIn: boolean = false;
  users: User[];

  constructor(private userStoreService: UserStoreService,
    private tempUserService: TempUserService,
    private socketService: SocketService) { }

  ngOnInit() {
    if (this.userStoreService.getStoredUser() !== undefined) {
      this.isLoggedIn = true;
      this.tempUserService.getAllTempUsers()
        .subscribe((users) => {
          if (users === undefined) {
            users = [];
          } else {
            this.users = users;
          }
        });
      console.log("Init io USERS ONLINE");
      this.initIoConnection();
    }
  }

  
  private initIoConnection(): void {
    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log("Connected");
        this.tempUserService.getAllTempUsers()
          .subscribe((users: User[]) => {
          if (users === undefined) {
            users = [];
          } else {
            this.users = users;
          }
        });
    });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log("Disconnected");
        this.tempUserService.getAllTempUsers()
          .subscribe((users: User[]) => {
          if (users === undefined) {
            users = [];
          } else {
            this.users = users;
          }
        });
    });
  
  }

  public openChatWithUser(user: User): void {
    this.chatWithUserEvent.emit(user);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public showDetails(userName: string) {
    return {
      'Name': userName,
      'Age': 666,
      'Messages exchanged': 123
    };
  }
}
