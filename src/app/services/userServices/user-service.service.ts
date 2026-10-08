import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = 'http://localhost:8080/api/users';  


  constructor(private http: HttpClient ) { }
  
   findAllPageable(page:number,size:Number):Observable<any>{
    return this.http.get<any>(this.url+"?page="+page+"&size="+size);
  }



// buscar por  username 
  findByNameUser(username:string):Observable<any>{
    return this.http.get<any>(this.url+"/solo-usernames?username="+username);
  }
  //buscar por email
  findByEmail(email:string):Observable<any>{
    return this.http.get<any>(this.url+"/solo-correos?email="+email);
  }
  //buscar por nombre
  findByName(nombre:string):Observable<any>{
    return this.http.get<any>(this.url+"/solo-names?name="+nombre);
  }


  // buscar por filtro de nombre, username y email
  
 findByFiltro(
  nombreusuario?: string,
  correoUsuario?: string,
  username?: string,
  page = 0,
  size = 5
): Observable<any> {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (nombreusuario?.trim()) {
    params = params.set('nombreusuario', nombreusuario.trim());
  }

  if (correoUsuario?.trim()) {
    params = params.set('correoUsuario', correoUsuario.trim());
  }

  if (username?.trim()) {
    params = params.set('username', username.trim());
  }

  return this.http.get<any>(`${this.url}/filtrar`, { params });
}


}
