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
    memno: 5,
    members: [],
  };
  numbers: Array<any> = [];
  constructor(private router: Router, private grpservice: GrpService) {
    this.numbers = Array.from({ length: this.grp.memno }, (v, k) => k + 1);
    console.log(this.grp.memno);
  }

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
  changemem(num: number) {
    this.grp.memno = num;
    console.log(this.grp.memno);
  }
}
