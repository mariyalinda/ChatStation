import { Component, OnInit } from '@angular/core';
import { GrpService } from '../grp.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addgrp',
  templateUrl: './addgrp.component.html',
  styleUrls: ['./addgrp.component.css'],
})
export class AddgrpComponent implements OnInit {
  group = {
    name: '',
    des: '',
    memno: 0,
    members: [],
  };
  user = {
    username: '',
    groups: [],
  };
  id = '';
  numbers: Array<any> = [];
  constructor(
    private router: Router,
    private grpservice: GrpService,
    public userservice: UserService
  ) {}

  ngOnInit(): void {}
  setNum(event) {
    this.group.memno = event.target.value;
    this.numbers = Array.from({ length: this.group.memno }, (v, k) => k);
  }
  addgrp() {
    this.group.memno++;
    this.id = localStorage.getItem('userid');
    this.userservice.getUser(this.id).subscribe((data) => {
      this.user = JSON.parse(JSON.stringify(data));
      this.group.members.push(this.user.username);
      this.grpservice.newGroup(this.group).subscribe(
        (group) => {
          alert(`Created group ${this.group.name}`);
          this.router.navigate(['/groups']);
        },
        (err) => {
          alert(`Entered details are not unique!`);
          console.log(err);
        }
      );
    });
  }
}
