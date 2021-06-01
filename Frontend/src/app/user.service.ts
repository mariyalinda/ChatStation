import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = {
    username: '',
    email: '',
  };
  constructor(private http: HttpClient) {}
  getUser(username: any) {
    return this.http.get('http://localhost:5000/user/' + username);
  }
}
