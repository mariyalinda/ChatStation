import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GrpService {
  constructor(private http: HttpClient) {}
  getGroups(grplist) {
    return this.http.post<any>('http://localhost:5000/groups', grplist);
  }
  newGroup(group: any) {
    return this.http.post<any>('http://localhost:5000/addgrp', group);
  }
  getGroup(id) {
    return this.http.get('http://localhost:5000/groups/' + id);
  }
  getMessages(grpid) {
    return this.http.get('http://localhost:5000/groups/msg/' + grpid);
  }
  newMessage(grpid, message) {
    return this.http
      .post('http://localhost:5000/groups/' + grpid + '/addmsg', message)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
