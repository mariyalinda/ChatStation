import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css'],
})
export class UseraccountComponent implements OnInit {
  current_user = {
    username: '',
    email: '',
    password: '',
    groups: [],
    blocked: [],
    muted: [],
  };
  id = '';
  constructor(private route: ActivatedRoute, public userservice: UserService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id).subscribe((data) => {
      this.current_user = JSON.parse(JSON.stringify(data));
    });
  }
}
