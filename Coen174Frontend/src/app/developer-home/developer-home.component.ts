import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 

@Component({
  selector: 'app-developer-home',
  templateUrl: './developer-home.component.html',
  styleUrls: ['./developer-home.component.css']
})
export class DeveloperHomeComponent implements OnInit {

    constructor(private bugService: Coen174ServiceService) { }
  
    ngOnInit() {
    	this.getAssignedBugs();
    }

    getAssignedBugs() {
    	let	email = localStorage.getItem("email")
    	this.bugService.getAssignedBugs(email).subscribe(
    		data => {
    			console.log(data); 
    		})

    }

}
