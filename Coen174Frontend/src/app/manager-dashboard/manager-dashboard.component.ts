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
    	this.getCurrentCodes();
        this.getExtraTechnologies(); 
    }

    updateTesterCode() {
    	let body = {
    		kind: "Tester", 
    		authCode: this.testerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    		})
    }

    updateDeveloperCode() {
		let body = {
    		kind: "Developer", 
    		authCode: this.developerCode
    	}
    	this.bugService.updateCode(body).subscribe(
    		data => {
    		})
    }
    updateManagerCode() {
        let body = {
            kind: "Manager", 
            authCode: this.managerCode
        }
        this.bugService.updateCode(body).subscribe(
            data => {
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
    		codes => {
                
    			for (let i = 0; i < codes.data.length; i++) {
    				if (codes.data[i].kind == "Tester") {
    					this.testerCode = codes.data[i].authCode; 
    				} else if (codes.data[i].kind = "Manager"){
                        this.managerCode = codes.data[i].authCode;
                    } else {
    					this.developerCode = codes.data[i].authCode;
    				}
    			}
    		})
    }

    addTechnology() {
        if (this.newTechnology != "") {
            let body = {
                tech: this.newTechnology
            }
            this.bugService.addTechnology(body).subscribe(
                data => {
                    this.technologies.push(this.newTechnology); 
                    this.newTechnology = ""; 
                })
        }
    }

    removeTechnology(name) {
        let body = {
            tech: name
        }

        this.bugService.removeTechnology(body).subscribe(
            data => {
                let index = this.technologies.indexOf(name); 
                if (index > -1) {
                    this.technologies.splice(index, 1); 
                }

            })
    }
}
