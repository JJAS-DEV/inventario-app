import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from '../../userServices/user-service.service';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../producto/producto.service';
import Swal from 'sweetalert2';
import { DetalleEntrada } from '../../../models/DetalleEntrada';

@Injectable({
  providedIn: 'root'
})
export class EventoEntradaSharingService {

  private _errorFormEventEmitter = new EventEmitter();
  private _detalleEntrada = new EventEmitter();
  private _producto = new EventEmitter();
private _cerrarModal = new EventEmitter<void>();

get cerrarModal(): EventEmitter<void> {
  return this._cerrarModal;
}

  productoCreadoEventEmitter = new EventEmitter<void>();

  get producto(): EventEmitter<any> {
    return this._producto;

  }

  get errorFormEventEmitter(): EventEmitter<any> {
    return this._errorFormEventEmitter;
  }
  get detalleEntrada(): EventEmitter<any> {
    return this._detalleEntrada;
  }

  detalleEntradas!: DetalleEntrada;


  constructor(private productoService: ProductoService) {
  }



  verificarProducto(producto: Producto) {
    this.productoService.VerificarProducto(producto).subscribe({
      next: (mensaje) => {




        Swal.fire({
          title: "producto verificado",
          text: mensaje.mensaje,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {

          this.detalleEntrada.emit({
            producto: { ...producto },
            cantidad: producto.stock,
            precioCompra: producto.precioCompra
          } as DetalleEntrada);

          this.producto.emit({
            proveedor: producto.proveedor
          } as Producto);

          this._cerrarModal.emit();



        });



      },
      error: (err) => {
        if (err.status == 400) {
          this.errorFormEventEmitter.emit(err.error);
          console.log(err.error);


        } else {
          console.error(err);

          Swal.fire({
            title: 'Error inesperado',
            text: err.error?.message || 'Ocurrió un problema en el servidor',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
          });
        }
      }




    });

  }


  validarMinimo(objeto: any, propiedad: string, minimo: number = 1): void {

    const valor = objeto[propiedad];

    if (valor == null || valor < minimo) {
      objeto[propiedad] = minimo;
    }





  }
}
