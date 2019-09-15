import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.css']
})
export class UsersOnlineComponent implements OnInit {

  private users: Array<string>;

  constructor() { 
    this.users = ["Goku", "Saitama", "Vegeta", "Krillin", "Frodo", "Sam", "Gandalf", "Saruman"];
  }

  ngOnInit() {
  }

  getUsers() {
    return this.users;
  }

  showDetails(userName: string) {
    return {
      'Name': userName,
      'Age': 666,
      'Messages exchanged': 123
    };
  }
}
