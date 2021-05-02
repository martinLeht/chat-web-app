import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { Action } from 'src/app/resources/action';
import { SocketService } from 'src/app/services/socket.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserLoginDialogComponent } from '../user-login-dialog/user-login-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  dialogRef: MatDialogRef<UserLoginDialogComponent> | null;

  constructor(private userStoreService: UserStoreService,
    private socketService: SocketService,
    public dialog: MatDialog) {}

  ngOnInit() {
    const loggedUser: string = this.userStoreService.getStoredUser();
    if (loggedUser !== "") {
      this.user.username = loggedUser;
    }
    setTimeout(() => {
      this.openUserLoginDialog()
    }, 0);
  }

  public openUserLoginDialog(): void {
    this.dialogRef = this.dialog.open(UserLoginDialogComponent, {
      data: { username: this.user.username}
    });

    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }
      this.user.username = paramsDialog.username;
      this.userStoreService.storeUser(this.user.username);
      
      this.initSocket();
    });
  }

  private initSocket(): void {
    this.socketService.initSocket();
  }

}
