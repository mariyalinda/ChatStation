import { Component, OnInit } from '@angular/core';
import { GrpService } from '../grp.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  grps = [
    {
      name: '',
      des: '',
      memno: 0,
      members: [],
    },
  ];
  constructor(public grpservice: GrpService) {}

  ngOnInit(): void {
    this.grpservice.getGroups().subscribe((data) => {
      this.grps = JSON.parse(JSON.stringify(data));
    });
  }
}
