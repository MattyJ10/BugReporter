import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 

@Component({
  selector: 'app-developer-home',
  templateUrl: './developer-home.component.html',
  styleUrls: ['./developer-home.component.css']
})
export class DeveloperHomeComponent implements OnInit {

    constructor(private bugService: Coen174ServiceService) { }
  
    public activeBugs = [];  
    public devs = []; 
    public activeBugListeners = []; 
    public resolvedBugListeners = []; 
    public comments = []; 
    public newComment; 

    ngOnInit() {
    	this.getAssignedBugs();
    }

    getAssignedBugs() {
    	let	email = localStorage.getItem("email")
    	this.bugService.getAssignedBugs(email).subscribe(
    		bugs => {
    			for (let i = 0; i < bugs.bugs.length; i++) {
              this.activeBugs.push(bugs.bugs[i]); 
              this.activeBugListeners[i] = false; 
              this.getCommentsForBug(bugs.bugs[i]._id);
          }
    		})
    }

    update(bug, index) {
    	let body = bug; 
    	body.currentWorker = ""; 
    	console.log(body); 
    	this.bugService.updateBug(body).subscribe(
    		res => {
    			console.log(res); 
          this.activeBugs.splice(index, 1); 
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

}
