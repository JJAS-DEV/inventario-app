import { Component, EventEmitter, input, Input, OnInit, output, Output } from '@angular/core';
import { Proveedor } from '../../../../models/Proveedor';
import { User } from '../../../../models/User';
import { DetalleEntrada } from '../../../../models/DetalleEntrada';
import { ProductoService } from '../../../../services/producto/producto.service';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../models/Producto';
import Swal from 'sweetalert2';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EventoEntradaSharingService } from '../../../../services/Entrada/EventoSharing/evento-entrada-sharing.service';
import { Entrada } from '../../../../models/Entrada';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-formulario-entrada-detalle',
  imports: [FormsModule, CrearProductoComponent],
  templateUrl: './formulario-entrada-detalle.component.html',
  styleUrl: './formulario-entrada-detalle.component.css'
})
export class FormularioEntradaDetalleComponent  implements OnInit  {

  @Input() Proveedor!: Proveedor;
  @Input() user!: User;

  @Output() proveedorValidoChange = new EventEmitter<boolean>();

  @Output()
  detalleSeleccionado = new EventEmitter<DetalleEntrada>();



  detalleEntrada: DetalleEntrada;

  constructor(private serviceProducto: ProductoService,private entradaService:EventoEntradaSharingService
    ,  @Inject(PLATFORM_ID) private platformId: Object,private eventoEntrada:EventoEntradaSharingService

  ) {

    this.detalleEntrada= new DetalleEntrada();
    this.detalleEntrada= {
  producto: new Producto()
};

  }

    ngOnInit(): void {

      this.eventoEntrada.cerrarModal.subscribe(() => {

        this.cerrarModal();
    });



  }


  


  proveedorNoEncontrado() {

 Swal.fire({
    title: '¿Cambiar proveedor?',
    text: 'Si modificas el proveedor, se eliminarán todos los productos agregados a la entrada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cambiar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33'
  }).then((result) => {

    if (result.isConfirmed) {


      this.proveedorValidoChange.emit(false);

    }

  });
  }
  EnvioDetalleEntrada() {
    this.detalleSeleccionado.emit(this.detalleEntrada);

  }



  formularioProductoVisible: boolean = false;

  mostrarFormularioProducto() {
    this.formularioProductoVisible = true;
  }


  cerrarFormularioProducto() {
    this.formularioProductoVisible = false;


  }


  //buscador de productos

  opcionesProductos: string[] = [];
  mostrarOpcionesProductos = false;
  errorPRoducto:boolean=false;

  
  buscarNamesProductos(texto: string): void {
    console.log('Texto escrito:', texto);

    this.serviceProducto.findListNamesProductosWithIdPRovedor(texto,this.Proveedor.idProveedor).subscribe({
      next: (response: string[]) => {
        // Si el backend devuelve directamente una lista de usernames
        this.opcionesProductos = response;

        console.log('Opciones de username:', this.opcionesProductos);
      },
      error: (error) => {
        console.error('Error al buscar usernames:', error);
        this.opcionesProductos = []; // Limpia opciones en caso de error
      }
    });

  }





  // Aquí puedes filtrar las opciones o consultar el servicio.
  seleccionarProducto(opcion: string): void {
    this.detalleEntrada.producto.nombre = opcion;


    this.buscadorProducto(opcion);

    this.opcionesProductos = [];



  }
  ocultarOpcionesProductos(): void {
    setTimeout(() => {

      this.buscadorProducto(this.detalleEntrada.producto.nombre 
)

    
    }, 150);
  }

   buscadorProducto(nombre:string) {
     this.serviceProducto.findProductoByNombre(nombre|| '').subscribe({
        next: (producto) => {
          this.detalleEntrada.producto = producto;
          console.log('Usuario seleccionado:', producto);
          this.errorPRoducto = false;


        },
        error: (error) => {
          console.error('Error al buscar user:', error);
          this.opcionesProductos = [];
          this.errorPRoducto = true;

          // Limpia opciones en caso de error
        }
      });
      this.mostrarOpcionesProductos = false;

    
  }


  



  validarMinimo(
  objeto: any,
  propiedad: string,
  minimo: number = 1
): void {

  const valor = objeto[propiedad];

  if (valor == null || valor < minimo) {
    objeto[propiedad] = minimo;
  }




  
}

  //habilitaciond de agregacion de detalle
  
   get formularioValido(): boolean {

  const productoValido =
    !!this.detalleEntrada.producto?.nombre?.trim();

  const cantidadValida =
    (this.detalleEntrada.cantidad ?? 0) > 0;

  const precioValido =
    (this.detalleEntrada.precioCompra ?? 0) > 0;

  return (
    productoValido &&
    cantidadValida &&
    precioValido &&
    !this.errorPRoducto
  );
}
//agregacion de detalle



agregarDetalle(){

  this.entradaService.detalleEntrada.emit(this.detalleEntrada);
  
 
  this.detalleEntrada = new DetalleEntrada();
  this.detalleEntrada= {
  producto: new Producto()
};
  console.log(this.detalleEntrada);



  }

//abrir modal


abrirModadProductos:boolean=false;
productoEnviar!:Producto;
abrirModalProductos(){


  this.abrirModadProductos=true;


}

cerrarModal(){

this.abrirModadProductos=false;


}






  
}
