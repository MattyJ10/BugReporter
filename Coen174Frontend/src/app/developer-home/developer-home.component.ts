import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 

@Component({
  selector: 'app-developer-home',
  templateUrl: './developer-home.component.html',
  styleUrls: ['./developer-home.component.css']
})
export class DeveloperHomeComponent implements OnInit {

    constructor(private bugService: Coen174ServiceService) { }
  

  	public activeBugs:any; 

    ngOnInit() {
    	this.getAssignedBugs();
    }

    getAssignedBugs() {
    	let	email = localStorage.getItem("email")
    	this.bugService.getAssignedBugs(email).subscribe(
    		data => {
    			this.activeBugs = data.bugs; 
    		})

    }

    update(bug) {
  	let body = bug; 
  	body.currentWorker = ""; 
  	console.log(body); 
  	this.bugService.updateBug(body).subscribe(
  		res => {
  			console.log(res); 
  		})
  }

}
