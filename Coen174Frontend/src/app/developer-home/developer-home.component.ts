import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-developer-home',
  templateUrl: './developer-home.component.html',
  styleUrls: ['./developer-home.component.css']
})
export class DeveloperHomeComponent implements OnInit {

    constructor(private bugService: Coen174ServiceService,
      private router: Router) { }
  
    public activeBugs = [];  
    public devs = []; 
    public activeBugListeners = []; 
    public viewCommentToggles = []; 
    public comments = []; 
    public newComment; 

    ngOnInit() {
    	this.getAssignedBugs();
      this.getDevsAndTesters(); 
    }

    getAssignedBugs() {
    	let	email = localStorage.getItem("email")
    	this.bugService.getAssignedBugs(email).subscribe(
    		async bugs => {
    			for (let i = 0; i < bugs.bugs.length; i++) {
              this.getCommentsForBug(bugs.bugs[i], i);
          }
    		})
    }

    getCommentsForBug(bug, index) {
    this.bugService.getComments(bug._id).subscribe(
        data => {
          this.comments.push(data.comments); 
          this.activeBugs.push(bug); 
          this.activeBugListeners[index] = false;
          this.viewCommentToggles[index] = false;
      })
    }  

    update(bug, index) {
    	let body = bug; 
    	body.currentWorker = ""; 
    	this.bugService.updateBug(body).subscribe(
    		res => {
          this.activeBugs.splice(index, 1); 
    		})
    }

    updateBugAssignment(worker, bugId, index) {
      let body = {
        worker: "", 
        id: bugId
      }

      this.bugService.updateBugAssignment(body).subscribe(
        data => {
          console.log(data); 
          this.activeBugs.splice(index, 1); 
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

  navToAllBugs() {
    this.router.navigate(['viewAllBugs']); 
  }

}
