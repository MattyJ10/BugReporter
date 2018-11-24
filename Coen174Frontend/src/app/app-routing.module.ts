import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component'; 
import { ManagerHomeComponent } from './manager-home/manager-home.component'; 
import { LoginComponent } from './login/login.component'; 
import { CreateAccountComponent } from './create-account/create-account.component'; 
//import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { DeveloperHomeComponent } from './developer-home/developer-home.component';

const routes: Routes = [
	{path: 'client', component: ClientHomeComponent},
	{path: 'manager', component: ManagerHomeComponent},
	{path: 'createAccount', component: CreateAccountComponent},
  {path: 'developer', component: DeveloperHomeComponent},
  //{path: 'codeManagement', component: ManagerDashboardComponent},
	{path: '', component: LoginComponent}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
