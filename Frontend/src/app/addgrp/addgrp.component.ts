import { Component, OnInit } from '@angular/core';
import { GrpService } from '../grp.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-addgrp',
  templateUrl: './addgrp.component.html',
  styleUrls: ['./addgrp.component.css'],
})
export class AddgrpComponent implements OnInit {
  grp = {
    name: '',
    des: '',
    memno: 0,
    members: [],
  };
  numbers: Array<any> = [];
  constructor(private router: Router, private grpservice: GrpService) {}

  ngOnInit(): void {}
  setNum(event) {
    this.grp.memno = event.target.value;
    this.numbers = Array.from({ length: this.grp.memno }, (v, k) => k);
  }
  addgrp() {
    this.grpservice.newGroup(this.grp);
    alert(`Created group ${this.grp.name}!`);
    this.router.navigate(['/groups']);
  }
}
