import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: Array<object>;
  isChatting = true;
  loggedUser = "Saitama";

  constructor() {
    this.messages = [
      {
        "user": "Saitama",
        "message": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Frodo",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Saitama",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Frodo",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Saitama",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Frodo",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      },
      {
        "user": "Saitama",
        "message": "JHIII mayn get this bread mans. Maito on semmosta.AINA!?",
        "time": new Date().toLocaleDateString()
      }
    ]; 
  }

  ngOnInit() {
  }

  getMessages() {
    return this.messages
  }

  /*
  sendMessage() {
    this.messages.push(
      {
        "user": "Saitama",
        "message": "UFFF new MEssage man.",
        "time": new Date().toLocaleDateString()
      }
    ) 
  }
  */
  onSubmit(msg: NgForm) {
    this.messages.push(
      {
        "user": "Saitama",
        "message": msg.value.text,
        "time": new Date().toLocaleDateString()
      }
    ) 
  }

}
