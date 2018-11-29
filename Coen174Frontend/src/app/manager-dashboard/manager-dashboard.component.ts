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
    public newTechnology; 
    public technologies = ["Camino", "eCampus", "GMail", "CourseAvail"];

    constructor(private bugService: Coen174ServiceService) { }

    ngOnInit() {
    	//this.getCurrentCodes();
    }

    updateTesterCode() {
    	let body = {
    		kind: "Tester", 
    		authCode: this.testerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    			console.log(data); 
    		})
    }

    updateDeveloperCode() {
		let body = {
    		kind: "Developer", 
    		authCode: this.developerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    			console.log(data); 
    		})
    }
    updateManagerCode() {
        let body = {
            kind: "Manager", 
            authCode: this.managerCode
        }
        this.bugService.updateCode(body).subscribe(
            data => {
                console.log(data); 
            })
    }

    getExtraTechnologies() {
        this.bugService.getExtraTechnologies().subscribe(
          res => {
            for (let i = 0; i < res.techs.length; i++) {
              this.technologies.push(res.techs[i].name); 
            }
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

    addTechnology() {
        if (this.newTechnology != "") {
            let body = {
                tech: this.newTechnology
            }
            this.bugService.addTechnology(body).subscribe(
                data => {
                    console.log(data); 
                })
        }
    }
}
