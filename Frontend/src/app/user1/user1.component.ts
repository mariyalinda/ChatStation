import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:5000';
@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class User1Component implements OnInit {
  viewed_user = {
    username: '',
    email: '',
    status: 'offline',
  };
  current_user = {
    username: '',
    email: '',
    status: 'offline',
    blocked: [],
    muted: [],
  };
  viewed_id = '';
  current_id = '';
  isBlocked = false;
  isMuted = false;
  socket;

  constructor(private route: ActivatedRoute, public userservice: UserService) {}

  ngOnInit(): void {
    this.isBlocked = false;
    this.isMuted = false;
    this.setupSocketConnection();
    this.viewed_id = this.route.snapshot.params['id'];
    this.current_id = localStorage.getItem('userid');
    this.userservice.getUser(this.viewed_id).subscribe((data) => {
      this.viewed_user = JSON.parse(JSON.stringify(data));
    });
    this.userservice.getUser(this.current_id).subscribe((data) => {
      this.current_user = JSON.parse(JSON.stringify(data));
      this.current_user.blocked.forEach((person) => {
        console.log('yes');
        if (person.id == this.viewed_id) {
          this.isBlocked = true;
        }
      });
      this.current_user.muted.forEach((person) => {
        console.log('yes');
        if (person.id == this.viewed_id) {
          this.isMuted = true;
        }
      });
    });
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);

    this.socket.on('message', (message) => {
      const div = document.createElement('div');
      div.classList.add('message'); //add class message
      div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
      <p class="text">${message.text}</p>`;
      const chatMessages = document.querySelector('.chat-messages');
      chatMessages.appendChild(div);

      //scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    const chatform = document.getElementById('chat-form');
    chatform.addEventListener('submit', (event) => {
      event.preventDefault();

      //emit message to server
      var msg = (event.target as HTMLInputElement)[0].value;
      this.socket.emit('chatMessage', msg);
      (event.target as HTMLInputElement)[0].value = '';
      (event.target as HTMLInputElement)[0].focus();
    });
  }
}
