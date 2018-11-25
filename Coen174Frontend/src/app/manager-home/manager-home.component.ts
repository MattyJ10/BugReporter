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

  public activeBugs:any; 
  public resolvedBugs:any;
  public devs:any; 
  
  ngOnInit() {
  	this.getBugs();
    this.getDevsAndTesters(); 
  }

  getBugs() {
  	this.bugService.getBugs().subscribe(
  		bugs => {
  			this.activeBugs = bugs.data;
  			console.log(this.activeBugs); 
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

  navigate() {
    //this.router.navigate(['/codeManagement']);
  }

  getDevsAndTesters() {
    this.bugService.getAllDevs().subscribe(
      devs => {
        for (let i = 0; i < devs.data.length; i++) {
          let email = devs.data[i].email; 
          let position = devs.data[i].position; 
          let dev = {
            email: email,
            position: position
          }
          this.devs.push(dev); 
        }
        console.log(devs); 
      })
  }

}
