import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarWelcomeComponent } from './navbar-welcome/navbar-welcome.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { AuthService } from './auth.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { UserService } from './user.service';
import { Group1Component } from './group1/group1.component';
import { GroupsComponent } from './groups/groups.component';
import { User1Component } from './user1/user1.component';
import { AddgrpComponent } from './addgrp/addgrp.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { GrpService } from './grp.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { UseraccountComponent } from './useraccount/useraccount.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavbarWelcomeComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    NavbarHomeComponent,
    Group1Component,
    GroupsComponent,
    User1Component,
    AddgrpComponent,
    UserprofileComponent,
    ConfirmComponent,
    UseraccountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    AuthService,
    GrpService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
