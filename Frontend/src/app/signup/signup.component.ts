import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user = {
    uname: '',
    email: '',
    pw: '',
  };
  constructor(private _router: Router, public _auth: AuthService) {}

  ngOnInit(): void {}
  signupUser() {
    this._auth.signupUser(this.user).subscribe(
      (res) => {
        alert(`Welcome aboard ${this.user.uname}!`);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/home']);
      },
      (err) => {
        alert(`Entered details are not unique!`);
        this._router.navigate(['/']);
      }
    );
  }
}
