import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public creds = {}; 
	public doesNotExist = false; 

	constructor(private bugService: Coen174ServiceService,
		private router: Router) { }

	ngOnInit() {

	}

	login() {
		this.doesNotExist = false; 
		this.bugService.login(this.creds).subscribe(
			data => { 
				localStorage.setItem("position", data.position);
				localStorage.setItem("email", data.email); 
				localStorage.setItem("firstName", data.firstName); 
				localStorage.setItem("lastName", data.lastName); 
				console.log(localStorage);
				if (data.position == "developer" || data.position == "tester") {
					this.router.navigate(['developer']); 
				} else if (data.position == "manager") {
					this.router.navigate(['manager']); 
				} else {
                    this.doesNotExist = true; 
                }
			},
			err => {
				this.doesNotExist = true; 
				console.log(err); 
			})
	}

	goToCreateAccount() {
		this.router.navigate(['createAccount']);
	}

}
