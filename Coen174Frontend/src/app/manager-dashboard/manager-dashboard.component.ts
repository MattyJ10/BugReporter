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
    public managerCode; 

    constructor(private bugService: Coen174ServiceService) { }

    ngOnInit() {
    	//this.getCurrentCodes();
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
    updateManagerCode() {
        let body = {
            kind: "Manager", 
            code: this.managerCode
        }
        this.bugService.updateCode(body).subscribe(
            data => {
                console.log(data); 
            })
    }

    getCurrentCodes() {
    	this.bugService.getCurrentCodes().subscribe(
    		data => {
                console.log(data); 
                /*
    			for (let i = 0; i < data.length; i++) {
    				if (data[i].kind == "tester") {
    					this.testerCode = data[i].code; 
    				} else if (data[i].kind = "manager"){
                        this.managerCode = data[i].code;
                    } else {
    					this.developerCode = data[i].code;
    				}
    			}*/
    		})
    }
}
