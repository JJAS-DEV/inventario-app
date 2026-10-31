import { Component, OnInit } from '@angular/core';
import { EntradaDto } from '../../Dto/EntradaDto';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaServiceService } from '../../services/Entrada/entrada-service.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProveedorService } from '../../services/proveevorService/proveedor.service';
import { UserService } from '../../services/userServices/user-service.service';

@Component({
  selector: 'app-entradas',
  imports: [PaginacionComponent, FormsModule, DatePipe],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements OnInit {
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page') ?? 0);
      this.cargarEntradas();
    });


  }



  constructor(private router: Router, private service: EntradaServiceService, private route: ActivatedRoute
    , private serviceProveedor: ProveedorService, private serviceUser: UserService

  ) {

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
      value = this.paginator.page.totalElements;
    }// queda guardado en el estado

    this.size = value;
    this.cargarEntradas();          // conserva la página obtenida de la URL
  }

  entradas: EntradaDto[] = [];

  paginator: any = {};
  size: number = 5;
  page: number = 0;
  total: number = 0;
  url: string = "/entradad/page";
  mostrarFiltros: boolean = false;




  // filtros de busqueda
  private cargarEntradas(): void {
    this.service.filtrarEntradas(
      this.filtro.proveedorNombre,
      this.filtro.userNombre,
      this.filtro.fechaInicio,
      this.filtro.fechaFin,
      this.page,
      this.size
    ).subscribe(pageable => {

      console.log("fecha inicio" + this.filtro.fechaInicio)

      this.entradas = pageable.content;
      this.paginator = pageable;
      this.total = pageable.totalElements;

    });
  }


  get tieneFiltrosActivos(): boolean {
    return !!(
      this.filtro.proveedorNombre?.trim() ||
      this.filtro.userNombre?.trim() ||
      this.filtro.fechaInicio ||
      this.filtro.fechaFin
    );
  }
  buscar(): void {
    this.page = 0;
    this.cargarEntradas();
  }
  limpiarFiltros(): void {
    this.filtro.proveedorNombre = '';
    this.filtro.userNombre = '';
    this.filtro.fechaInicio = '';
    this.filtro.fechaFin = '';

    this.page = 0;

    this.cargarEntradas();
  }

  //----------------------filtrado 

  tipoFecha: String = "FECHA";
  filtro = {
    proveedorNombre: '',
    userNombre: '',
    fechaInicio: '',
    fechaFin: ''
  };

  opcionesUsername: string[] = [];
  mostrarOpcionesusername = false;

  opcionesNameProveedor: string[] = [];
  mostrarOpcionesProveedor = false;





  //buscador por nombre de usuario
  buscarUsername(texto: string): void {
    console.log('Texto escrito:', texto);

    this.serviceUser.findByName(texto).subscribe({
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
  ocultarOpcionesUsername(): void {
    setTimeout(() => {
      this.mostrarOpcionesusername = false;
    }, 150);
  }

  seleccionarUserNombre(opcion: string): void {
    this.filtro.userNombre = opcion;
    this.opcionesUsername = [];
  }

  //filtro buscar nombreProveedor

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
    this.filtro.proveedorNombre = opcion;
    this.opcionesNameProveedor = [];
  }
   ocultarOpcionesProveedorName(): void {
    setTimeout(() => {
      this.mostrarOpcionesProveedor = false;
    }, 150);
  }

}
