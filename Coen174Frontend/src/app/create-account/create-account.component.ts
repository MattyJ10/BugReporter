import { Component, OnInit } from '@angular/core';
import { Coen174ServiceService } from '../coen174-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

	public account = {};

    constructor(private bugService: Coen174ServiceService) { }

    ngOnInit() {
    }

    createAccount() {
    	this.bugService.createAccount(this.account).subscribe(
    		data => {
    			console.log(data);
    		})

    }

}
