import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { Proveedor } from '../../../../models/Proveedor';
import { User } from '../../../../models/User';
import { DetalleEntrada } from '../../../../models/DetalleEntrada';
import { ProductoService } from '../../../../services/producto/producto.service';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../models/Producto';

@Component({
  selector: 'app-formulario-entrada-detalle',
  imports: [FormsModule],
  templateUrl: './formulario-entrada-detalle.component.html',
  styleUrl: './formulario-entrada-detalle.component.css'
})
export class FormularioEntradaDetalleComponent {

  @Input() Proveedor!: Proveedor;
  @Input() user!: User;

  @Output() proveedorValidoChange = new EventEmitter<boolean>();

  @Output()
  detalleSeleccionado = new EventEmitter<DetalleEntrada>();

  detalleEntrada: DetalleEntrada;

  constructor(private serviceProducto: ProductoService) {

    this.detalleEntrada= new DetalleEntrada();
    this.detalleEntrada= {
  producto: new Producto()
};

  }


  proveedorNoEncontrado() {
    this.proveedorValidoChange.emit(false);
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

    this.serviceProducto.findListNamesProductos(texto).subscribe({
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

  console.log(this.detalleEntrada);

  }






}
