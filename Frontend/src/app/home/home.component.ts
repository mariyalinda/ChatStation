import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

declare var $: any;
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
  current_id = '';
  constructor(public userservice: UserService) {}

  ngOnInit(): void {
    this.current_id = localStorage.getItem('userid');
    this.userservice.getUsers().subscribe((data) => {
      this.users = JSON.parse(JSON.stringify(data));
      this.users.forEach((user) => {
        user.status = 'offline';
      });
    });
    $(document).ready(function () {
      $('#myInput').on('keyup', function () {
        var value = $(this).val().toLowerCase();
        $('#myDIV *').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }
}
