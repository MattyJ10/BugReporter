import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable,of, from } from 'rxjs'; 
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class Coen174ServiceService {

  constructor(private http: HttpClient) { }

  public saveBug(body): Observable<any> {
  	return this.http.post('https://limitless-forest-73957.herokuapp.com/api/saveBug', body);
  }

  public getBugs(): Observable<any> {
  	return this.http.get('https://limitless-forest-73957.herokuapp.com/api/getBugs'); 
  }

  public updateBug(body): Observable<any> {
  	return this.http.post('https://limitless-forest-73957.herokuapp.com/api/updateBug', body); 
  }

}
