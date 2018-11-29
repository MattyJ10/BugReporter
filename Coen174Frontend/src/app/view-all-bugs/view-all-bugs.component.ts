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
    public viewCommentToggles = []; 
    public comments = []; 
    public newComment; 
    public employeeType; 
    public technologies = ["Camino", "eCampus", "GMail", "CourseAvail"]; 

    public filters = {}; 



    constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

    ngOnInit() {
    	this.getBugs();
   		this.getDevsAndTesters(); 
   		this.employeeType = localStorage.getItem('position'); 
   		this.getExtraTechnologies(); 
    }

    filterBugs() {
    	console.log(this.filters); 
    	this.bugService.getFilteredBugs(this.filters).subscribe(
    		async data => {
    			console.log(data);
    			this.activeBugs = []; 
    			this.activeBugListeners = []; 
    			this.viewCommentToggles = []; 
    			this.comments = []; 
    			for (let i = 0; i < data.bugs.length; i++) {
	            	await this.getCommentsForBug(data.bugs[i], i);
	        	}
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

    getBugs() {
    	this.filters = {}; 
    	this.activeBugs = []; 
		this.activeBugListeners = []; 
		this.viewCommentToggles = []; 
		this.comments = []; 
  		this.bugService.getBugs().subscribe(
  			async bugs => {
	        	for (let i = 0; i < bugs.data.length; i++) {
	            	await this.getCommentsForBug(bugs.data[i], i);
	        	}
  			}
  		)
	}

	getCommentsForBug(bug, index) {
	this.bugService.getComments(bug._id).subscribe(
	  	data => {
	  		this.activeBugs[index] = bug; 
	        this.activeBugListeners[index] = false; 
	        this.viewCommentToggles[index] = false; 
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

	addStatusUpdateComment(status, index) {
	    let d = new Date();
	    let comm = {
	      comment: "Bug changed to status: " + status,
	      dateAdded: d
	    }
	    this.comments[index].push(comm); 
	    let body = {
	      bugId: this.activeBugs[index]._id,
	      comment: "Bug changed to status: " + status,
	      dateAdded: d
	    }
	    this.bugService.addComment(body).subscribe(
	      data => {
	        console.log(data); 
	        this.newComment = "";
	        this.activeBugListeners[index] = false; 
	      })
	  }

	updateBugAssignment(worker, bugId) {
	    let body = {
	      worker: worker, 
	      id: bugId
	    }

	    this.bugService.updateBugAssignment(body).subscribe(
	      data => {
	        console.log(data); 
	      })
  	}

  	updateBugStatus(status, bugId) {
	    let body = {
	      status: status,
	      id: bugId
	    }
	    this.bugService.updateBugStatus(body).subscribe(
	      data => {
	        console.log(data); 
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

	navToDeveloper() {
		this.router.navigate(['developer']); 
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
}
