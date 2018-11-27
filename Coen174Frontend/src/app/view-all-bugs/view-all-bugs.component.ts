import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-bugs',
  templateUrl: './view-all-bugs.component.html',
  styleUrls: ['./view-all-bugs.component.css']
})
export class ViewAllBugsComponent implements OnInit {
	public activeBugs = [];  
    public devs = []; 
    public activeBugListeners = []; 
    public resolvedBugListeners = []; 
    public comments = []; 
    public newComment; 

    constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

    ngOnInit() {
    	this.getBugs();
   		this.getDevsAndTesters(); 
    }

    getBugs() {
  	this.bugService.getBugs().subscribe(
  		bugs => {
	        for (let i = 0; i < bugs.data.length; i++) {
	            this.activeBugs.push(bugs.data[i]); 
	            this.activeBugListeners[i] = false; 
	            this.getCommentsForBug(bugs.data[i]._id);
	        }
  		})
	}

	getCommentsForBug(id) {
	this.bugService.getComments(id).subscribe(
	  	data => {
		    this.comments.push(data.comments); 
		    console.log(data);
		    console.log(this.comments); 
		})
	}

	addActiveBugComment(index) {
		let d = new Date(); 
		let comm = {
		  	comment: this.newComment,
		  	dateAdded: d
		}

		this.comments[index].push(comm); 
		let body = {
		  	bugId: this.activeBugs[index]._id,
		  	comment: this.newComment,
		  	dateAdded: d
		}
		this.bugService.addComment(body).subscribe(
		  	data => {
		    	console.log(data); 
		    	this.newComment = "";
		    	this.activeBugListeners[index] = false; 
		  	})

	}

	update(bug) {
	let body = bug; 
	this.bugService.updateBug(body).subscribe(
	  	res => {
	    	console.log(res); 
	  	})
	}

	getDevsAndTesters() {
	this.bugService.getAllDevs().subscribe(
	  	devs => {
	    	for (let i = 0; i < devs.data.length; i++) {
		      	let email = devs.data[i].email; 
		      	let position = devs.data[i].position; 
		      	let fullName = devs.data[i].firstName + " " + devs.data[i].lastName;
		      	let dev = {
		        	email: email,
		        	position: position,
		        	name: fullName
		     	}
	      		this.devs.push(dev); 
	    	}
	  	})
	}

	navToManager() {
		this.router.navigate(['manager']); 
	}


}
