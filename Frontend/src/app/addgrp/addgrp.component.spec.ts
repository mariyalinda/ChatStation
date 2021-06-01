import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgrpComponent } from './addgrp.component';

describe('AddgrpComponent', () => {
  let component: AddgrpComponent;
  let fixture: ComponentFixture<AddgrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
