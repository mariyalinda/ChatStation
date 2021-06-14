import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrpService } from '../grp.service';

@Component({
  selector: 'app-group1',
  templateUrl: './group1.component.html',
  styleUrls: ['./group1.component.css'],
})
export class Group1Component implements OnInit {
  group = {
    name: '',
    des: '',
    memno: 0,
    members: [],
  };
  id = '';
  constructor(private route: ActivatedRoute, public grpservice: GrpService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.grpservice.getGroup(this.id).subscribe((data) => {
      this.group = JSON.parse(JSON.stringify(data));
    });
  }
}
