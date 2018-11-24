import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public creds = {}; 
	public doesNotExist = false; 

	constructor(private bugService: Coen174ServiceService) { }

	ngOnInit() {

	}

	login() {
		this.doesNotExist = false; 
		this.bugService.login(this.creds).subscribe(
			data => { 
				console.log(data)
			},
			err => {
				this.doesNotExist = true; 
				console.log(err); 
			})
	}

}
