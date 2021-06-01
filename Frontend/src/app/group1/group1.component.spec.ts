import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Group1Component } from './group1.component';

describe('Group1Component', () => {
  let component: Group1Component;
  let fixture: ComponentFixture<Group1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Group1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Group1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
