import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css'],
})
export class NavbarHomeComponent implements OnInit {
  constructor(private _router: Router, public _auth: AuthService) {}

  ngOnInit(): void {}
  viewProfile() {
    var id = localStorage.getItem('userid');
    this._router.navigateByUrl('/home/' + id + '/view/account');
  }
  logOutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    this._router.navigate(['/']);
  }
}
