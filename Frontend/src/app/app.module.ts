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
import { Group2Component } from './group2/group2.component';
import { GroupsComponent } from './groups/groups.component';
import { User1Component } from './user1/user1.component';
import { User2Component } from './user2/user2.component';
import { AddgrpComponent } from './addgrp/addgrp.component';

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
    Group2Component,
    GroupsComponent,
    User1Component,
    User2Component,
    AddgrpComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    AuthService,
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
