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
  	return this.http.post('https://protected-sea-43964.herokuapp.com/api/saveBug', body);
  }

  public getBugs(): Observable<any> {
  	return this.http.get('https://protected-sea-43964.herokuapp.com/api/getBugs'); 
  }

  public updateBug(body): Observable<any> {
  	return this.http.post('https://protected-sea-43964.herokuapp.com/api/updateBug', body); 
  }

  public login(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/login', body); 
  }

  public createAccount(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/createAccount', body);
  }

  public updateCode(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/updateCode', body);
  }

  public getCurrentCodes(): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/currentCodes');
  }

  public setManagerCode(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/setManagerCode', body); 
  }

  public getAllDevs(): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/getAllDevs'); 
  }

  public getAssignedBugs(email): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/getAssignedBugs/' + email); 
  }

  public getSubmittedBugs(email): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/getSubmittedBugs/' + email); 
  }

  public getComments(id): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/getComments/' + id); 
  }

  public addComment(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/addComment', body); 
  }

  public deleteBug(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/deleteBug', body);
  }

  public getExtraTechnologies(): Observable<any> {
    return this.http.get('https://protected-sea-43964.herokuapp.com/api/getExtraTechnologies/'); 
  }

  public getFilteredBugs(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/getFilteredBugs', body)
  }

  public addTechnology(body): Observable<any> {
    return this.http.post('https://protected-sea-43964.herokuapp.com/api/addTechnology', body)
  }


}
