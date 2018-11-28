import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    logout() {
    	localStorage.clear(); 
    	console.log(localStorage); 
    	this.router.navigate(['']);
    }

    viewAllBugs() {
      this.router.navigate(['viewAllBugs']); 
    }

    viewYourBugs() {
      this.router.navigate(['developer']); 
    }

    dashBoard() {
      this.router.navigate(['dashboard']);
    }

}
