import { Component } from '@angular/core';
import { Entrada } from '../../../models/Entrada';
import { FormsModule, NgForm } from '@angular/forms';
import { ProveedorService } from '../../../services/proveevorService/proveedor.service';
import { UserService } from '../../../services/userServices/user-service.service';
import { FormularioEntradaDetalleComponent } from './formulario-entrada-detalle/formulario-entrada-detalle.component';
import { User } from '../../../models/User';
import { Proveedor } from '../../../models/Proveedor';
import { DetalleEntrada } from '../../../models/DetalleEntrada';
import { CurrencyPipe } from '@angular/common';
import { EntradaServiceService } from '../../../services/Entrada/entrada-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-entradas',
  imports: [FormsModule, FormularioEntradaDetalleComponent, CurrencyPipe],
  templateUrl: './form-entradas.component.html',
  styleUrl: './form-entradas.component.css'
})
export class FormEntradasComponent {

  entrada!: Entrada;

  constructor(private serviceProveedor: ProveedorService, private serviceUser: UserService, private entradaService: EntradaServiceService) {
    this.entrada = new Entrada();
  }

  onSubmit(userForm: NgForm): void {
    console.log(this.entrada)


  }

  onClear(entradaForm: NgForm): void {
    entradaForm.reset();
    entradaForm.resetForm();
  }
  //buscador de proveedor
  opcionesNameProveedor: string[] = [];
  mostrarOpcionesProveedor = false;
  errorNombreProveedor: boolean = false;
  proveedorValido = false;


  buscarProveedorname(texto: string): void {
    console.log('Texto escrito:', texto);

    this.serviceProveedor.filtrarNombres(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesNameProveedor = response;
        console.log('Opciones de nombre:', this.opcionesNameProveedor);
      },
      error: (error) => {
        console.error('Error al buscar nombres:', error);
        this.opcionesNameProveedor = []; // Limpia opciones en caso de error
      }
    });

  }
  seleccionarProveedorNombre(opcion: string): void {
    this.entrada.proveedor.nombre = opcion;
    this.proveedorValido = true;

    this.opcionesNameProveedor = [];
  }
  ocultarOpcionesProveedorName(): void {
    setTimeout(() => {
      this.serviceProveedor.findByNombre(this.entrada.proveedor.nombre || '').subscribe({
        next: (proveedor) => {
          this.entrada.proveedor = proveedor;
          console.log('Proveedor seleccionado:', proveedor);
          this.errorNombreProveedor = false;
          this.proveedorValido = true; // Marca como válido si se encuentra el proveedor

        },
        error: (error) => {
          console.error('Error al buscar nombres:', error);
          this.opcionesNameProveedor = [];
          this.errorNombreProveedor = true;

          this.proveedorValido = false;
          // Limpia opciones en caso de error
        }
      });

      this.mostrarOpcionesProveedor = false;

    }, 150);
  }

  //buscador de usuario


  opcionesUsername: string[] = [];
  mostrarOpcionesusername = false;
  errorUsername: boolean = false;

  usuarioValido = false;



  buscarUsername(texto: string): void {
    console.log('Texto escrito:', texto);

    this.serviceUser.findByNameUser(texto).subscribe({
      next: (response: string[]) => {
        // Si el backend devuelve directamente una lista de usernames
        this.opcionesUsername = response;
        console.log('Opciones de username:', this.opcionesUsername);
      },
      error: (error) => {
        console.error('Error al buscar usernames:', error);
        this.opcionesUsername = []; // Limpia opciones en caso de error
      }
    });



  }

  // Aquí puedes filtrar las opciones o consultar el servicio.
  seleccionarUsername(opcion: string): void {
    this.entrada.user.username = opcion;
    this.usuarioValido = true;
    this.opcionesUsername = [];

  }

  ocultarOpcionesUsername(): void {
    setTimeout(() => {

      this.serviceUser.findByNameUsers(this.entrada.user.username || '').subscribe({
        next: (user) => {
          this.entrada.user = user;
          console.log('Usuario seleccionado:', user);
          this.errorUsername = false;
          this.usuarioValido = true;


        },
        error: (error) => {
          console.error('Error al buscar user:', error);
          this.opcionesUsername = [];
          this.errorUsername = true;
          this.usuarioValido = false;

          // Limpia opciones en caso de error
        }
      });
      this.mostrarOpcionesusername = false;
    }, 150);
  }


  formularioEntradaDetalleComponent: boolean = false;

  vistaFormularioEntradaDetalleComponent(): void {
    this.formularioEntradaDetalleComponent = true;
    console.log('Formulario Entrada Detalle Component:', this.formularioEntradaDetalleComponent);
  }












  // }

  //bandera para cambiar proveedor
  recibirProveedorValido(event: boolean): void {
    this.formularioEntradaDetalleComponent = event;
    this.entrada = new Entrada();
  }

  //agrcion de detalle entrada

  recibirDetalle(detalle: DetalleEntrada) {
    console.log(detalle);
    const existente = this.entrada.detalles.find(
      d => d.producto.idProducto === detalle.producto.idProducto
    );

    if (existente) {

      existente.cantidad =
        (existente.cantidad ?? 0) + (detalle.cantidad ?? 0);

    } else {

      this.entrada.detalles.push({
        ...detalle
      });

    }

  }

  eliminarDetalle(index: number) {
    this.entrada.detalles.splice(index, 1);
  }

  calcularTotal(): number {
    return this.entrada.detalles.reduce(
      (total, d) => total + (d.cantidad ?? 0) * (d.precioCompra ?? 0),
      0
    );
  }
  guardarEntrada() {
    console.log("entrada creada")
    console.log(this.entrada)
    console.log(JSON.stringify(this.entrada, null, 2));
    this.entradaService.create(this.entrada).subscribe({

      next: (response) => {


        Swal.fire({
          icon: 'success',
          title: 'Entrada registrada',
          text: 'La entrada se registró correctamente.'
        });

        this.entrada = new Entrada();
        this.proveedorValido = false;
        this.usuarioValido = false;

      },
      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No fue posible registrar la entrada.'
        });

      }
    })



  }

}







