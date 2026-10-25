import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaServiceService {
    private url: string = 'http://localhost:8080/api/entradad';


  constructor(private http: HttpClient) { }

   findAllPageable(page: number, size: Number): Observable<any> {
      return this.http.get<any>(this.url + "?page=" + page + "&size=" + size);
    }
}
