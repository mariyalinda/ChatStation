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
  getUsers() {
    return this.http.get('http://localhost:5000/users');
  }
  getUser(id) {
    return this.http.get('http://localhost:5000/user/' + id);
  }
  updatePassword(user) {
    return this.http.post('http://localhost:5000/user/update', user);
  }
  blockUser(currentuser_id, vieweduser_id) {
    return this.http.get(
      'http://localhost:5000/user/' + currentuser_id + '/block/' + vieweduser_id
    );
  }
  muteUser(currentuser_id, vieweduser_id) {
    return this.http.get(
      'http://localhost:5000/user/' + currentuser_id + '/mute/' + vieweduser_id
    );
  }
  unblockUser(currentuser_id, vieweduser_id) {
    return this.http.get(
      'http://localhost:5000/user/' +
        currentuser_id +
        '/unblock/' +
        vieweduser_id
    );
  }
  unmuteUser(currentuser_id, vieweduser_id) {
    return this.http.get(
      'http://localhost:5000/user/' +
        currentuser_id +
        '/unmute/' +
        vieweduser_id
    );
  }
}
