import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Group2Component } from './group2.component';

describe('Group2Component', () => {
  let component: Group2Component;
  let fixture: ComponentFixture<Group2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Group2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Group2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
