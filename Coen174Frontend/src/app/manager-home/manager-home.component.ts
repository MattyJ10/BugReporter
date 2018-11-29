import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

    public activeBugs = [];  
    public devs = []; 
    public activeBugListeners = []; 
    public viewCommentToggles = []; 
    public comments = []; 
    public newComment; 
    
  ngOnInit() {
  	this.getBugs();
    this.getDevsAndTesters(); 
  }

  async getBugs() {
    this.bugService.getBugs().subscribe(
      bugs => {
          for (let i = 0; i < bugs.data.length; i++) {
              this.getCommentsForBug(bugs.data[i], i);
          }
          console.log(this.activeBugs); 
      })
  }

  getCommentsForBug(bug, index) {
  this.bugService.getComments(bug._id).subscribe(
      data => {
        if (bug.status != 'fixed') {
          this.activeBugs[this.activeBugs.length] = bug; 
          this.activeBugListeners[this.activeBugListeners.length] = false; 
          this.viewCommentToggles[this.viewCommentToggles.length] = false; 
          this.comments[this.comments.length] = data.comments; 
        }
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
        console.log(this.devs); 
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

  navToAllBugs() {
    this.router.navigate(['viewAllBugs']); 
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
