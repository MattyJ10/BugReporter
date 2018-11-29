import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevAuthGuardGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("dev guard called"); 
    if (localStorage.getItem("position") == 'Developer' || localStorage.getItem("position") == 'Tester' || localStorage.getItem("position") == 'Manager') {
    	return true; 
    } else {
    	return false; 
    }
  }
}
