import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { Action } from 'src/app/resources/action';
import { SocketService } from 'src/app/services/socket.service';
import { TempUserService } from 'src/app/services/temp-user.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserLoginDialogComponent } from '../user-login-dialog/user-login-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  chatWithUser: User;
  dialogRef: MatDialogRef<UserLoginDialogComponent> | null;

  constructor(private tempUserService: TempUserService,
    private userStoreService: UserStoreService,
    private socketService: SocketService,
    public dialog: MatDialog) {}

  ngOnInit() {
    const loggedUser: User = this.userStoreService.getStoredUser();
    console.log(loggedUser);
    if (loggedUser !== undefined) {
      console.log("Already in session");
      this.user = loggedUser;
    } else {
      console.log("Trying open user sdialog");
      setTimeout(() => {
        this.openUserLoginDialog()
      }, 0);
    }
    
  }

  private openUserLoginDialog(): void {
    this.dialogRef = this.dialog.open(UserLoginDialogComponent, {
      data: { user: this.user }
    });

    this.dialogRef.afterClosed().subscribe(username => {
      if (!username) {
        console.log("Nothing from dialog...");
        return;
      }
      console.log("Working!");
      console.log(username);
      this.tempUserService.saveTempUser(username)
        .subscribe((user: User) => {
          if (user === undefined) return;
          console.log(user);
          this.user = user;
          this.userStoreService.storeUser(user);
          this.socketService.initSocket(this.user);
        });
        
    });
  }

  public setUserToChatWith(user: User) : void {
    this.chatWithUser = user;
  }

}
