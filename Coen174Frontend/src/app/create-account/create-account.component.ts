import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

	public account = {};
	public err = false; 

    constructor(private bugService: Coen174ServiceService,
    	private router: Router) { }

    ngOnInit() {
    }

    createAccount() {
    	this.err = false; 
    	this.bugService.createAccount(this.account).subscribe(
    		data => {
    			if (data.msg == "Account Created") {
    				localStorage.setItem("position", data.user.position);
    				localStorage.setItem("email", data.user.email); 
    				localStorage.setItem("firstName", data.user.firstName); 
    				localStorage.setItem("lastName", data.user.lastName); 
    				console.log(localStorage);
    				if (data.user.position == "developer" || data.user.position == "tester") {
    					this.router.navigate(['developer']); 
    				} else {
    					this.router.navigate(['manger']); 
    				}
    			}
    		})

    }

}
