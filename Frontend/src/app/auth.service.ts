import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginUrl = 'http://localhost:5000/login';
  private _signupUrl = 'http://localhost:5000/signup';

  constructor(private http: HttpClient) {}

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }
  signupUser(user: any) {
    return this.http.post<any>(this._signupUrl, user);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
