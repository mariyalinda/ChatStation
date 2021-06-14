import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  viewed_user = {
    username: '',
    email: '',
  };
  current_user = {
    username: '',
    email: '',
    blocked: [],
    muted: [],
  };
  viewed_id = '';
  current_id = '';
  isBlocked = false;
  isMuted = false;
  constructor(
    public userservice: UserService,
    public route: ActivatedRoute,
    public _router: Router
  ) {
    alert('Please click on the user icon for latest status!');
  }

  ngOnInit(): void {
    this.viewed_id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.viewed_id).subscribe((data) => {
      this.viewed_user = JSON.parse(JSON.stringify(data));
    });
    this.current_id = localStorage.getItem('userid');
    this.userservice.getUser(this.current_id).subscribe((data) => {
      this.current_user = JSON.parse(JSON.stringify(data));
    });
    if (this.route.snapshot.url[4].path == 'true') {
      if (this.route.snapshot.url[3].path == 'block') {
        this.isBlocked = true;
        this.userservice
          .blockUser(this.current_id, this.viewed_id)
          .subscribe((data) => {
            this.current_user = JSON.parse(JSON.stringify(data));
          });
      }
      if (this.route.snapshot.url[3].path == 'mute') {
        this.isMuted = true;
        this.userservice
          .muteUser(this.current_id, this.viewed_id)
          .subscribe((data) => {
            this.current_user = JSON.parse(JSON.stringify(data));
          });
      }
    }
  }

  blockUser() {
    this._router.navigateByUrl('/home/' + this.viewed_id + '/view/block');
  }
  muteUser() {
    this._router.navigateByUrl('/home/' + this.viewed_id + '/view/mute');
  }
  reload() {
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
  }
}
