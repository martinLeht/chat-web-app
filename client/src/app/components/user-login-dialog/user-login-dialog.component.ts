import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TempLoginDialogData } from 'src/app/model/dialog/TempLoginDialogData';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.css']
})
export class UserLoginDialogComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;

  constructor(
    public dialogRef: MatDialogRef<UserLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TempLoginDialogData,
    private userStoreService: UserStoreService) { 
      this.previousUsername = userStoreService.getStoredUser() ? userStoreService.getStoredUser() : (data.username ? data.username : undefined);
      this.usernameFormControl.setValue(this.previousUsername ? this.previousUsername : "");
    }

  ngOnInit(): void {
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onTempSignInClick(): void {
    this.dialogRef.close({
      username: this.usernameFormControl.value,
      previousUsername: this.previousUsername
    });

  }

  public onLoginClick(): void {

  }

  public onRegisterClick(): void {

  }

}
