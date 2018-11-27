import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 

@Component({
  selector: 'app-view-submitted-bugs',
  templateUrl: './view-submitted-bugs.component.html',
  styleUrls: ['./view-submitted-bugs.component.css']
})
export class ViewSubmittedBugsComponent implements OnInit {

	public submittedBugs:any; 
	public email:String;

    constructor(private bugService: Coen174ServiceService) { }

    ngOnInit() {
    	this.getSubmittedBugs();
    }

    getSubmittedBugs() {
    	this.bugService.getSubmittedBugs(this.email).subscribe(
    		data => {
    			console.log(data); 
    		})
    }	


}
