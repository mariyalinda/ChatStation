import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GrpService {
  grp = {
    name: '',
    des: '',
    memno: 0,
    members: [],
  };
  constructor(private http: HttpClient) {}
  getGroups() {
    return this.http.get('http://localhost:5000/groups');
  }
  newGroup(grp: any) {
    return this.http
      .post('http://localhost:5000/addgrp', { group: grp })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
