import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GrpService } from '../grp.service';
import { UserService } from '../user.service';
import { io } from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:5000';
@Component({
  selector: 'app-group1',
  templateUrl: './group1.component.html',
  styleUrls: ['./group1.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class Group1Component implements OnInit {
  group = {
    name: '',
    des: '',
    memno: 0,
    members: [],
  };
  grpid = '';
  user = {
    username: '',
    email: '',
    status: '',
  };
  msgs;
  userid = '';
  messages = {
    grpid: '',
    messages: [],
  };
  message = {
    text: '',
    sender: '',
    time: '',
  };
  grpuser = {
    username: '',
    room: '',
  };
  status = '';
  socket;
  constructor(
    private route: ActivatedRoute,
    public grpservice: GrpService,
    public userservice: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // alert('Please wait for 5 seconds'); helped in getting correct info

    //get details
    this.grpid = this.route.snapshot.params['id'];
    this.grpservice.getGroup(this.grpid).subscribe((data) => {
      this.group = JSON.parse(JSON.stringify(data));
      this.grpuser.room = this.group.name;
    });
    this.userid = localStorage.getItem('userid');
    this.userservice.getUser(this.userid).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
      this.grpuser.username = this.user.username;
    });
    //by putting making it async (and using .then()), setupsocketconnection() not working

    this.getOldMessages();
    this.setupSocketConnection();
  }

  getOldMessages() {
    //display existing messages
    this.grpservice.getMessages(this.grpid).subscribe((data) => {
      this.messages = JSON.parse(JSON.stringify(data));
      this.messages.messages.forEach((object) => {
        var div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${object.sender}<span>${object.time}</span><span>▼</span></p>
          <p class="text">${object.text}</p>`;
        var chatMessages = document.querySelector('.chat-messages');
        chatMessages.appendChild(div);
        //scroll down
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    });
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    //join chatroom
    console.log(this.grpuser);
    this.socket.emit('joinRoom', this.grpuser);

    this.socket.on('message', (message) => {
      var div = document.createElement('div');
      div.classList.add('message'); //add class message
      div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span><span>▼</span></p>
      <ul class="dropdown-menu">
      <li><a href="#">Copy</a></li>
      <li><a href="#">Forward</a></li>
    </ul><p class="text">${message.text}</p>`;
      var chatMessages = document.querySelector('.chat-messages');
      chatMessages.appendChild(div);
      //add to database
      this.message.sender = message.username;
      this.message.time = message.time;
      this.message.text = message.text;
      this.grpservice.newMessage(this.grpid, this.message);

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
  deletegrp() {
    this.grpservice.delGroup(this.grpid, this.userid).subscribe(
      (res) => {
        console.log(res);
        alert(`You left ${this.group.name}`);
        this.router.navigate(['/groups']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
//its passing correct value to server only after a time delay
