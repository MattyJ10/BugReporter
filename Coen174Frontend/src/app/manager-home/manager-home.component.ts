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
    public resolvedBugListeners = []; 
    public comments = []; 
    public newComment; 
    
  ngOnInit() {
  	this.getBugs();
    this.getDevsAndTesters(); 
  }

  getBugs() {
  	this.bugService.getBugs().subscribe(
  		bugs => {
        for (let i = 0; i < bugs.data.length; i++) {
           this.getCommentsForBug(bugs.data[i], i);
        }
  		})
  }

  getCommentsForBug(bug, index) {
    this.bugService.getComments(bug._id).subscribe(
      data => {
        if (bug.status != "fixed") {
            this.activeBugs.push(bug.status); 
            this.activeBugListeners[index] = false; 
            this.comments[index] = data.comments;
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
