import { Component } from '@angular/core';
import { Entrada } from '../../../models/Entrada';
import { FormsModule, NgForm } from '@angular/forms';
import { ProveedorService } from '../../../services/proveevorService/proveedor.service';
import { UserService } from '../../../services/userServices/user-service.service';

@Component({
  selector: 'app-form-entradas',
  imports: [FormsModule],
  templateUrl: './form-entradas.component.html',
  styleUrl: './form-entradas.component.css'
})
export class FormEntradasComponent {

  entrada!: Entrada;

  constructor(private serviceProveedor: ProveedorService, private serviceUser: UserService) {
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
    this.opcionesNameProveedor = [];
  }
  ocultarOpcionesProveedorName(): void {
    setTimeout(() => {
      this.serviceProveedor.findByNombre(this.entrada.proveedor.nombre || '').subscribe({
        next: (proveedor) => {
          this.entrada.proveedor = proveedor;
          console.log('Proveedor seleccionado:', proveedor);
          this.errorNombreProveedor = false;

        },
        error: (error) => {
          console.error('Error al buscar nombres:', error);
          this.opcionesNameProveedor = [];
          this.errorNombreProveedor = true;
          // Limpia opciones en caso de error
        }
      });

      this.mostrarOpcionesProveedor = false;

    }, 150);
  }

  //buscador de usuario


  opcionesUsername: string[] = [];
  mostrarOpcionesusername = false;

            errorUsername:boolean   = false;


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



    // Aquí puedes filtrar las opciones o consultar el servicio.
  }

  seleccionarUsername(opcion: string): void {
    this.entrada.user.username = opcion;
    this.opcionesUsername = [];

  }

   ocultarOpcionesUsername(): void {
    setTimeout(() => {

        this.serviceUser.findByNameUsers(this.entrada.user.username || '').subscribe({
        next: (user) => {
          this.entrada.user = user;
          console.log('Usuario seleccionado:', user);
          this.errorUsername   = false;

        },
        error: (error) => {
          console.error('Error al buscar user:', error);
          this.opcionesUsername = [];
          this.errorUsername = true;
          // Limpia opciones en caso de error
        }
      });
      this.mostrarOpcionesusername = false;
    }, 150);
  }








  // }




}







