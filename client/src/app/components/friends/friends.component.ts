import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  private friends: Array<string>;  

  constructor() {
    this.friends = ["Goku", "Saitama", "Vegeta", "Krillin", "Frodo", "Sam", "Gandalf", "Saruman"];
  }

  ngOnInit() {
  }

  getFriends() {
    return this.friends;
  }

  showDetails(friendName: string) {
    return {
      'Name': friendName,
      'Age': 666,
      'Messages exchanged': 123
    };
  }



}
