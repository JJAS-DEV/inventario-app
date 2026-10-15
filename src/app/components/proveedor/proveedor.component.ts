import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../services/proveevorService/proveedor.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  imports: [PaginacionComponent, FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {

  proveedor: Proveedor[] = [];
  paginator: any = {};
  url: string = "/proveedor/page"
  size: number = 5;
  page: number = 0;
  total: number = 0;

  constructor(private router: Router, private service: ProveedorService,
    private route: ActivatedRoute

  ) {
    this.proveedorBuscador = new Proveedor();
    this.proveedorBuscador.activo=null;
  
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page') ?? 0);
      this.cargarProveedor();
    });
  }

  private cargarProveedor(): void {
    this.service.filtrarProveedores(this.proveedorBuscador.nombre, this.proveedorBuscador.rut,
      this.proveedorBuscador.email, this.proveedorBuscador.telefono,this.proveedorBuscador.activo!
      , this.page, this.size).subscribe(pageable => {
        this.proveedor = pageable.content as Proveedor[];
        this.paginator = pageable;

        this.total = this.proveedor.length
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
      value = this.paginator.page.totalElements;
    }// queda guardado en el estado

    this.size = value;
    this.cargarProveedor();          // conserva la página obtenida de la URL
  }


  // filtrado proveedor
  mostrarFiltros = false;
  proveedorBuscador: Proveedor;
  mostrarOpcionesNombre = false;
  mostrarOpcionesRut = false;
  mostrarOpcionesEmail = false;
  mostrarOpcionesTelefono = false;
  opcionesNombre: string[] = [];
  opcionesRut: string[] = [];
  opcionesEmail: string[] = [];
  opcionesTelefono: string[] = [];

  buscarNombre(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.filtrarNombres(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesNombre = response;
        console.log('Opciones de nombre:', this.opcionesNombre);
      },
      error: (error) => {
        console.error('Error al buscar nombres:', error);
        this.opcionesNombre = []; // Limpia opciones en caso de error
      }
    });
  }

  buscarRut(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.filtrarRuts(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesRut = response;
        console.log('Opciones de rut:', this.opcionesRut);
      },
      error: (error) => {
        console.error('Error al buscar rut:', error);
        this.opcionesRut = [];
      }
    });
  }

  buscarEmail(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.filtrarEmails(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesEmail = response;
        console.log('Opciones de email:', this.opcionesEmail);
      },
      error: (error) => {
        console.error('Error al buscar emails:', error);
        this.opcionesEmail = [];
      }
    });
  }

  buscarTelefono(texto: string): void {
    console.log('Texto escrito:', texto);

    this.service.filtrarTelefonos(texto).subscribe({
      next: (response: string[]) => {
        this.opcionesTelefono = response;
        console.log('Opciones de teléfono:', this.opcionesTelefono);
      },
      error: (error) => {
        console.error('Error al buscar teléfonos:', error);
        this.opcionesTelefono = [];
      }
    });
  }

  // --- Seleccionar opción ---
  seleccionarNombre(opcion: string): void {
    this.proveedorBuscador.nombre = opcion;
    this.opcionesNombre = [];
  }

  seleccionarRut(opcion: string): void {
    this.proveedorBuscador.rut = opcion;
    this.opcionesRut = [];
  }

  seleccionarEmail(opcion: string): void {
    this.proveedorBuscador.email = opcion;
    this.opcionesEmail = [];
  }

  seleccionarTelefono(opcion: string): void {
    this.proveedorBuscador.telefono = opcion;
    this.opcionesTelefono = [];
  }

  // --- Ocultar opciones ---
  ocultarOpcionesNombre(): void {
    setTimeout(() => {
      this.mostrarOpcionesNombre = false;
    }, 150);
  }

  ocultarOpcionesRut(): void {
    setTimeout(() => {
      this.mostrarOpcionesRut = false;
    }, 150);
  }

  ocultarOpcionesEmail(): void {
    setTimeout(() => {
      this.mostrarOpcionesEmail = false;
    }, 150);
  }

  ocultarOpcionesTelefono(): void {
    setTimeout(() => {
      this.mostrarOpcionesTelefono = false;
    }, 150);
  }

  // --- Limpiar filtros ---
  limpiarFiltros(): void {
    this.proveedorBuscador.nombre = '';
    this.proveedorBuscador.rut = '';
    this.proveedorBuscador.email = '';
    this.proveedorBuscador.telefono = '';
    this.cargarProveedor(); // método que recarga la lista general
  }

  public buscar(): void {

    this.cargarProveedor();
  }


}
