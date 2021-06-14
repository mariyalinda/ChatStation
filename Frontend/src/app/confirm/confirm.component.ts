import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  viewed_user = {
    username: '',
    email: '',
  };
  action = '';
  vieweduser_id = '';
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    public userservice: UserService
  ) {}

  ngOnInit(): void {
    this.vieweduser_id = this.route.snapshot.params['id'];
    this.action = this.route.snapshot.url[3].path;
    this.userservice.getUser(this.vieweduser_id).subscribe((data) => {
      this.viewed_user = JSON.parse(JSON.stringify(data));
    });
  }
  confirmUser() {
    if (this.action == 'block') {
      this._router.navigateByUrl(
        'home/' + this.vieweduser_id + '/view/block/true'
      );
    } else if (this.action == 'mute') {
      this._router.navigateByUrl(
        'home/' + this.vieweduser_id + '/view/mute/true'
      );
    }
  }
  reject() {
    this._router.navigateByUrl(
      'home/' + this.vieweduser_id + '/view/profile/default'
    );
  }
}
