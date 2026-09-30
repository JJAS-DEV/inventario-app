import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = 'http://localhost:8080/api/users';  


  constructor(private http: HttpClient ) { }
  
   findAllPageable(page:number):Observable<any>{
    return this.http.get<any>(this.url+"?page="+page);
  }


}
