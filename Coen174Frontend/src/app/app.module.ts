import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ManagerCreateUserComponent } from './manager-create-user/manager-create-user.component';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientHomeComponent,
    ManagerHomeComponent,
    LoginComponent,
    ManagerCreateUserComponent,
    DeveloperHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
