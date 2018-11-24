import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

  public bugs:any; 
  

  ngOnInit() {
  	this.getBugs();
  }

  getBugs() {
  	this.bugService.getBugs().subscribe(
  		bugs => {
  			this.bugs = bugs.data;
  			console.log(this.bugs); 
  		})
  }

  update(bug) {
  	let body = bug; 
  	console.log(body); 
  	this.bugService.updateBug(body).subscribe(
  		res => {
  			console.log(res); 
  		})
  }

  navigate() {
    this.router.navigate(['/codeManagement']);
  }

}
