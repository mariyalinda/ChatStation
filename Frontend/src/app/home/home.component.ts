import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users = [
    {
      username: '',
      status: '',
    },
  ];

  constructor(public userservice: UserService) {}

  ngOnInit(): void {
    this.userservice.getUsers().subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
      this.users.forEach((user) => {
        user.status = 'offline';
      });
    });
  }
}
