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
    public codeErr = false; 

    constructor(private bugService: Coen174ServiceService,
    	private router: Router) { }

    ngOnInit() {
    }

    createAccount() {
    	this.err = false; 
        this.codeErr = false; 
    	this.bugService.createAccount(this.account).subscribe(
    		data => {
    			if (data.msg == "Account Created") {
    				localStorage.setItem("position", data.user.position);
    				localStorage.setItem("email", data.user.email); 
    				localStorage.setItem("firstName", data.user.firstName); 
    				localStorage.setItem("lastName", data.user.lastName);
    				if (data.user.position == "Developer" || data.user.position == "Tester") {
    					this.router.navigate(['developer']); 
    				} else if (data.user.position == "Manager") {
    					this.router.navigate(['manager']); 
    				} else {
                        this.err = true; 
                    }
    			}
    		}, 
            err => {
                console.log(err); 
                if (err.error.msg == "Code Doesn't Match") {
                    this.codeErr = true; 
                }
            })
    }

}
