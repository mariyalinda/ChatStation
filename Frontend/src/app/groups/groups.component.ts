import { Component, OnInit } from '@angular/core';
import { GrpService } from '../grp.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  current_user = {
    username: '',
    groups: [],
  };
  grps = [
    {
      name: '',
      des: '',
      memno: 0,
      members: [],
    },
  ];
  id = '';
  constructor(public grpservice: GrpService, public userservice: UserService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('userid');
    this.userservice.getUser(this.id).subscribe((data) => {
      this.current_user = JSON.parse(JSON.stringify(data));
      this.grpservice.getGroups(this.current_user.groups).subscribe(
        (res) => {
          if (res.message == 'No groups') {
            alert('No groups');
          } else {
            this.grps = <any>res.message;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
