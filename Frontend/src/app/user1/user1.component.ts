import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css'],
})
export class User1Component implements OnInit {
  user = {
    username: '',
    email: '',
    status: 'offline',
  };
  viewed_id = '';
  current_id = '';
  constructor(private route: ActivatedRoute, public userservice: UserService) {}

  ngOnInit(): void {
    this.viewed_id = this.route.snapshot.params['id'];
    this.current_id = localStorage.getItem('userid');
    this.userservice.getUser(this.viewed_id).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
    });
  }
}
