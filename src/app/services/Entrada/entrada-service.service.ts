import { HttpClient, HttpParams } from '@angular/common/http';
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

filtrarEntradas(
  proveedorNombre?: string,
  userNombre?: string,
  fechaInicio?: string,
  fechaFin?: string,
  page = 0,
  size = 5
): Observable<any> {

  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  if (proveedorNombre?.trim()) {
    params = params.set('proveedorNombre', proveedorNombre.trim());
  }

  if (userNombre?.trim()) {
    params = params.set('userNombre', userNombre.trim());
  }

  if (fechaInicio) {
    params = params.set('fechaInicio', fechaInicio);
  }

  if (fechaFin) {
    params = params.set('fechaFin', fechaFin);
  }

  

  return this.http.get<any>(
    `${this.url}/filtrar`,
    { params }
  );
}}
