import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { Group1Component } from './group1/group1.component';
import { GroupsComponent } from './groups/groups.component';
import { User1Component } from './user1/user1.component';
import { AddgrpComponent } from './addgrp/addgrp.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { UseraccountComponent } from './useraccount/useraccount.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'home/:id',

    component: User1Component,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/profile/default',
    canActivate: [AuthGuard],
    component: UserprofileComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/account',
    canActivate: [AuthGuard],
    component: UseraccountComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/block/true',
    canActivate: [AuthGuard],
    component: UserprofileComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/mute/true',
    canActivate: [AuthGuard],
    component: UserprofileComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/block/false',
    canActivate: [AuthGuard],
    component: UserprofileComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/mute/false',
    canActivate: [AuthGuard],
    component: UserprofileComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/block',
    canActivate: [AuthGuard],
    component: ConfirmComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/mute',
    canActivate: [AuthGuard],
    component: ConfirmComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/unblock',
    canActivate: [AuthGuard],
    component: ConfirmComponent,
    pathMatch: 'full',
  },
  {
    path: 'home/:id/view/unmute',
    canActivate: [AuthGuard],
    component: ConfirmComponent,
    pathMatch: 'full',
  },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/:id', component: Group1Component },
  { path: 'addgrp', canActivate: [AuthGuard], component: AddgrpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
