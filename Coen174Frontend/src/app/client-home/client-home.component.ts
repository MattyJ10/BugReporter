import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(private bugService: Coen174ServiceService,
    private router: Router) { }

  public bugData = {software:""}; 
  public email; 
  public otherSoftware
  public technologies = ["Camino", "eCampus", "Gmail", "CourseAvail"];

  ngOnInit() {
    this.getExtraTechnologies(); 
  }

  sendBug() {
    if (this.bugData.software == 'other') {
      this.bugData.software = this.otherSoftware; 
    }
  	this.bugService.saveBug(this.bugData).subscribe(
      res => {
        console.log(res); 
        this.bugData = { software: ""}; 
      },
      err => {
        console.log(err); 
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

  navToViewSub() {
    this.router.navigate(['viewSubmittedBugs']); 
  }

  navToLogin() {
    this.router.navigate(['login']); 
  }

}
