import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    private url: string = 'http://localhost:8080/api/categorias';



  constructor(private http: HttpClient) { }


  //----------------------------------------------filtrado Rapido---------------------------

  filtrarCategoriasByName (nombre?: string): Observable<any> {
      return this.http.get<any>(
        `${this.url}/BuscadorRapido`,
        {
          params: {
            nombre: nombre || ''
          }
        }
      );
    }
}
