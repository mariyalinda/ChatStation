import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { Group1Component } from './group1/group1.component';
import { Group2Component } from './group2/group2.component';
import { GroupsComponent } from './groups/groups.component';
import { User1Component } from './user1/user1.component';
import { User2Component } from './user2/user2.component';
import { AddgrpComponent } from './addgrp/addgrp.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'group1', component: Group1Component },
  { path: 'group2', component: Group2Component },
  { path: 'groups', component: GroupsComponent },
  { path: 'user1', component: User1Component },
  { path: 'user2', component: User2Component },
  { path: 'addgrp', component: AddgrpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
