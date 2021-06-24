import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public userservice: UserService
  ) {}

  ngOnInit(): void {
    // alert('Please wait for 5 seconds before sending new messages');
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
    //by putting .then(), setupsocket() not working
    // this.getOldMessages(this.grpuser, this.setupSocketConnection(this.grpuser));

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
        div.innerHTML = `<p id="message" class="meta">${object.sender}<span>${object.time}</span><span>▼</span></p>
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
      div.innerHTML = `<p id="message" class="meta">${message.username}<span>${message.time}</span><span>▼</span></p>
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
  //its passing correct value to server only after a time delay
  public ngAfterViewInit() {
    // Solution for catching click events on anchors using querySelectorAll:
    this.msgs = document.querySelectorAll('#message');
    this.msgs.forEach((anchor: HTMLAnchorElement) => {
      anchor.addEventListener('click', this.dropdown);
    });
  }
  dropdown() {
    document.getElementById('message').style.display = 'block';
  }
}
