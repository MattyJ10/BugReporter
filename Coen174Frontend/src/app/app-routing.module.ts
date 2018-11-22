import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component'; 
import { ManagerHomeComponent } from './manager-home/manager-home.component'; 

const routes: Routes = [
	{path: 'client', component: ClientHomeComponent},
	{path: 'manager', component: ManagerHomeComponent}
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
