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
    public rowClickListeners = []; 
    public comments = []; 
    public newComment; 

    constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

    ngOnInit() {
    	this.getBugs();
   		this.getDevsAndTesters(); 
    }

    async getBugs() {
  	this.bugService.getBugs().subscribe(
  		async bugs => {
	        for (let i = 0; i < bugs.data.length; i++) {
	            await this.getCommentsForBug(bugs.data[i], i);
	        }
  		})
	}

	getCommentsForBug(bug, index) {
	console.log(bug); 
	this.bugService.getComments(bug._id).subscribe(
	  	data => {
	  		this.activeBugs[index] = bug; 
	        this.activeBugListeners[index] = false; 
	        this.rowClickListeners[index] = false; 
		    this.comments[index] = data.comments; 
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

	delete(bug, index) {
	    let body = {
	      bug: bug
	    }
	    this.bugService.deleteBug(body).subscribe(
	      data => {
	        this.activeBugs.splice(index, 1); 
	        this.comments.splice(index, 1); 
	        this.activeBugListeners.splice(index, 1); 
	      })
  	}

  	updateListener(index) {
  		this.rowClickListeners[index] = !this.rowClickListeners[index];
  		console.log(this.rowClickListeners); 
  	}



}
