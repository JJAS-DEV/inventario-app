import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../../../../../models/Producto';
import { Proveedor } from '../../../../../models/Proveedor';
import { EventoEntradaSharingService } from '../../../../../services/Entrada/EventoSharing/evento-entrada-sharing.service';
import { BuscadorCategoriaComponent } from '../../../../buscadores/buscadorCategoria/buscador-categoria/buscador-categoria.component';
import { Categoria } from '../../../../../models/Categoria';
import { DetalleEntrada } from '../../../../../models/DetalleEntrada';
@Component({
  selector: 'app-crear-producto',
  imports: [FormsModule, BuscadorCategoriaComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
  standalone: true
})
export class CrearProductoComponent implements OnInit {
  @Input()
  proveedor!: Proveedor;
  producto: Producto;
  @Output()
  envioDetalleEntrada = new EventEmitter<DetalleEntrada>();
  errors: any = {};
  ngOnInit() {
        this.producto = new Producto();

    this.eventoEntrada.errorFormEventEmitter.subscribe(error => this.errors = error);

     this.eventoEntrada.producto.subscribe(producto=>{

      this.producto=producto;

    })
    
    this.producto.proveedor=this.proveedor





  }
  private eventoEntrada = inject(EventoEntradaSharingService);



  constructor() {
    this.producto = new Producto();
    this.producto.activo = true;

  }
  onSubmit(form: NgForm): void {
console.log("lo que envia")
 console.log(JSON.stringify(this.producto))

    this.eventoEntrada.verificarProducto(this.producto);



    this.errors = {};

    // Aquí llamas a tu servicio
    // this.productoService.create(this.producto).subscribe(...);

  }

  onClear(form: NgForm): void {
    form.resetForm({

      activo: true
    });

    this.errors = {};
  }

  validarMinimo(objeto: any, propiedad: string, minimo: number = 1): void {

    this.eventoEntrada.validarMinimo(objeto, propiedad, minimo);






  }


  recibirCategoria(categoria: Categoria): void {

    this.producto.categoria = categoria;

    console.log(categoria);

  }
  agregarProducto() {

      

    console.log(JSON.stringify(this.producto));


  }

 
}
