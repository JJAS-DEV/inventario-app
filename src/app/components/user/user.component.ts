import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/userServices/user-service.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharingUSerService } from '../../services/userServices/sharingDataUser/sharing-user.service';

@Component({

  selector: 'app-user',
  imports: [PaginacionComponent, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  private sharingUser = inject(SharingUSerService);



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
      let value = input.valueAsNumber;


   
    
      if (isNaN(value)) {
    value = 5;
  }

  // Si es negativo, poner 5
  if (value < 0) {
    value = 5;
  }
  // Si es mayor al límite, dejar en 12
  else if (value > this.paginator.page.totalElements) {
    value =  this.paginator.page.totalElements;
  }// queda guardado en el estado

   this.size=value;
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


crearUsuario(): void {
  
  this.router.navigate(['/usersForm']);
}
editarUsuario(id:number):void{

  this.router.navigate(['/users/edit/'+id])
}
eliminar(id:number):void{
  this.sharingUser.eliminarById(id);
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

//buscar por nombre, correo y username

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
    limpiarFiltros(): void {
      this.nombreusuario = '';
      this.correoUsuario = '';
      this.username = '';
      this.cargarUsuarios();
    }

}
