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

  public bugData = {}; 
  public email; 

  ngOnInit() {
  }

  sendBug() {
  	this.bugService.saveBug(this.bugData).subscribe(
      res => {
        console.log(res); 
        this.bugData = {}; 
      },
      err => {
        console.log(err); 
      })
  }

  navToViewSub() {
    this.router.navigate(['viewSubmittedBugs']); 
  }

}
