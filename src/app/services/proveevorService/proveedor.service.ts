import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private url: string = 'http://localhost:8080/api/proveedor';


  constructor(private http: HttpClient) { }

  findAllPageable(page: number, size: Number): Observable<any> {
    return this.http.get<any>(this.url + "?page=" + page + "&size=" + size);
  }

  // --- Filtro general con paginación ---

  filtrarProveedores(nombre?: string, rut?: string, email?: string, telefono?: string,activo?:boolean, page = 0, size = 5): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (nombre?.trim()) {
      params = params.set('nombre', nombre.trim());
    }

    if (rut?.trim()) {
      params = params.set('rut', rut.trim());
    }

    if (email?.trim()) {
      params = params.set('email', email.trim());
    }

    if (telefono?.trim()) {
      params = params.set('telefono', telefono.trim());
    }
  if (activo !== null && activo !== undefined) params = params.set('activo', activo.toString());    

    return this.http.get<any>(`${this.url}/filtrar`, { params });
  }

  // --- Filtros rápidos ---
  filtrarNombres(nombre?: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/nombres`, { params: { nombre: nombre || '' } });
  }

  filtrarEmails(email?: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/emails`, { params: { email: email || '' } });
  }

  filtrarRuts(rut?: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/ruts`, { params: { rut: rut || '' } });
  }

  filtrarTelefonos(telefono?: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/telefonos`, { params: { telefono: telefono || '' } });
  }
}
