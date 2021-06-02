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
  // $(document).ready(function () {
  //   $(document).on('change', '#num', function () {
  //     this.grp.memno = $('#num').val();
  //     console.log(this.grp.memno);
  //   });
  // });
  addgrp() {
    this.grpservice.newGroup(this.grp);
    alert('Success!');
    this.router.navigate(['/groups']);
  }
  setNum(event) {
    this.grp.memno = event.target.value;
    this.numbers = Array.from({ length: this.grp.memno }, (v, k) => k);
    console.log(this.grp.memno);
  }
}
