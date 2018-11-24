import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

	public testerCode; 
	public developerCode; 

    constructor(private bugService: Coen174ServiceService) { }

    ngOnInit() {
    	this.getCurrentCodes();
    }

    updateTesterCode() {
    	let body = {
    		kind: "Tester", 
    		code: this.testerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    			console.log(data); 
    		})
    }

    updateDeveloperCode() {
		let body = {
    		kind: "Developer", 
    		code: this.developerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    			console.log(data); 
    		})
    }

    getCurrentCodes() {
    	console.log("test");
    	this.bugService.getCurrentCodes().subscribe(
    		data => {
    			console.log(data[0].type);
    			for (let i = 0; i < data.length; i++) {
    				if (data[i].type == "tester") {
    					this.testerCode = data[0].code; 
    					console.log(this.testerCode); 
    				} else {
    					this.developerCode = data[0].code;
    					console.log(this.testerCode);
    				}
    			}
    		})
    }
}
