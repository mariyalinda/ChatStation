import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWelcomeComponent } from './navbar-welcome.component';

describe('NavbarWelcomeComponent', () => {
  let component: NavbarWelcomeComponent;
  let fixture: ComponentFixture<NavbarWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
