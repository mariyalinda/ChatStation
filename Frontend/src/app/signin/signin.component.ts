import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user = {
    uname: '',
    pw: '',
  };
  constructor(private _router: Router, public _auth: AuthService) {}

  ngOnInit(): void {}
  loginUser() {
    this._auth.loginUser(this.user).subscribe(
      (res) => {
        alert(`Welcome back ${this.user.uname}!`);
        localStorage.setItem('token', res.token);
        localStorage.setItem('userid', res.id);
        this._router.navigate(['/home']);
      },
      (err) => {
        alert(`User does not exist!`);
        this._router.navigate(['/signin']);
      }
    );
  }
}
