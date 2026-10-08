import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/userServices/user-service.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-user',
  imports: [PaginacionComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {





  users: User[] = [];
  paginator: any = {};
  url: string = "/users/page"
  size: number = 5;
  constructor(private router: Router, private service: UserService,
    private route: ActivatedRoute
  ) {

  }

  private page = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page') ?? 0);
      this.cargarUsuarios();
    });
  }

  actualizarCantidad(e: Event): void {
    const input = e.target as HTMLInputElement;

    if (input.value === '' || !input.validity.valid) {
      return;
    }

    this.size = input.valueAsNumber; // queda guardado en el estado
    this.cargarUsuarios();          // conserva la página obtenida de la URL
  }

  private cargarUsuarios(): void {
    this.service.findByFiltro(this.nombreusuario, this.correoUsuario, this.username, this.page, this.size).subscribe(pageable => {
      this.users = pageable.content as User[];
      this.paginator = pageable;
    });
  }








public buscar(): void {

  this.cargarUsuarios();
}

// ---------------------filtrado



  mostrarFiltros = false;
  nombreusuario = '';
  correoUsuario = '';
  username = '';
  opcionesUsername: string[] = [];
  opcionesEmail: string[] = [];
  opcionesNombre: string[] = [];
  mostrarOpcionesusername = false;
  mostrarOpcionesemail = false;
  mostrarOpcionesNombre = false;



  buscarUsername(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.findByNameUser(texto).subscribe({
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

  buscarcorreoUsuario(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.findByEmail(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesEmail = response;
        console.log('Opciones de email:', this.opcionesEmail);
      }
      ,
      error: (error) => {


        console.error('Error al buscar emails:', error);

        this.opcionesEmail = []; // Limpia opciones en caso de error
      }
    })


  }
  buscarNombre(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.findByName(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesNombre = response;
        console.log('Opciones de nombre:', this.opcionesNombre);
      }
      ,
      error: (error) => {
        console.error('Error al buscar nombres:', error);
        this.opcionesNombre = []; // Limpia opciones en caso de error
      }
    })

  }
  seleccionarUsername(opcion: string): void {
    this.username = opcion;
    this.opcionesUsername = [];

  }
  seleccionarEmail(opcion: string): void {
    this.correoUsuario = opcion;
    this.opcionesEmail = [];

  }
  seleccionarNombre(opcion: string): void {
    this.nombreusuario = opcion;
    this.opcionesNombre = [];
  }


  ocultarOpcionesUsername(): void {
    setTimeout(() => {
      this.mostrarOpcionesusername = false;
    }, 150);
  }
  ocultarOpcionenEmail(): void {
    setTimeout(() => {
      this.mostrarOpcionesemail = false;
    }, 150);

  }
  ocultarOpcionesNombre(): void {
    setTimeout(() => {
      this.mostrarOpcionesNombre = false;
    }, 150);
  }


}
