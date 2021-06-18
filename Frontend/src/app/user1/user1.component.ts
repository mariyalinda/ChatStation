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
  user = {
    username: '',
    email: '',
    status: 'offline',
  };
  viewed_id = '';
  current_id = '';
  socket;

  constructor(private route: ActivatedRoute, public userservice: UserService) {}

  ngOnInit(): void {
    this.setupSocketConnection();
    this.viewed_id = this.route.snapshot.params['id'];
    this.current_id = localStorage.getItem('userid');
    this.userservice.getUser(this.viewed_id).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
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
