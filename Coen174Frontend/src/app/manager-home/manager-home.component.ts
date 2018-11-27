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
  			this.activeBugs = bugs.data;
        for (let i = 0; i < bugs.data.length; i++) {
          if (bugs.data[i] != "fixed") {
            this.activeBugs.push(bugs.data[i]); 
            this.activeBugListeners[i] = false; 
          } 
        }
        this.getCommentsForBugs(); 
  			console.log(this.activeBugs); 
  		})
  }

  getCommentsForBugs() {
    for (let i = 0; i < this.activeBugs.length; i++) {
      this.bugService.getComments(this.activeBugs[i].id).subscribe(
        data => {
          this.comments.push(data.comments); 
        })
    }
    console.log(this.comments); 
  }

  addActiveBugComment(index) {
    this.comments[index].push(this.newComment); 
    let body = {
      bugId: this.activeBugs[index].id,
      comment: this.newComment
    }
    this.bugService.addComment(body).subscribe(
      data => {
        console.log(data); 
        this.newComment = ""; 
      })
  }

  update(bug) {
    let body = bug; 
    console.log(body); 
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
          console.log(dev.name); 
        }
        console.log(devs); 
      })
  }

}
