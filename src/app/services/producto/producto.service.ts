import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url: string = 'http://localhost:8080/api/productos';


  constructor(private http: HttpClient) { }
  //lista de nombres de productos
  findListNamesProductos(nombre?: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.url}/nombres`,
      {
        params: {
          nombre: nombre || ''
        }
      }
    );

  }

  //lista de nombres de productos por nombre e idProveedor

  findListNamesProductosWithIdPRovedor(
    nombre?: string,
    idProveedor?: number
  ): Observable<string[]> {

    return this.http.get<string[]>(
      `${this.url}/Filtrar-Nombre-IdProveedor`,
      {
        params: {
          nombre: nombre || '',
          idProveedor: idProveedor?.toString() || ''
        }
      }
    );
  }


  // buscar producto por nombre

  findProductoByNombre(nombre?: string): Observable<Producto> {
    return this.http.get<Producto>(
      `${this.url}/buscar-por-nombre`,
      {
        params: {
          nombre: nombre || ''
        }
      }
    );
  }

}
