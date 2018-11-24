import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component'; 
import { ManagerHomeComponent } from './manager-home/manager-home.component'; 
import { LoginComponent } from './login/login.component'; 

const routes: Routes = [
	{path: 'client', component: ClientHomeComponent},
	{path: 'manager', component: ManagerHomeComponent},
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
