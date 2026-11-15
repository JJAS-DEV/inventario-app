import { Component, EventEmitter, Output } from '@angular/core';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoria } from '../../../../models/Categoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador-categoria',
  imports: [FormsModule],
  templateUrl: './buscador-categoria.component.html',
  styleUrl: './buscador-categoria.component.css'
})
export class BuscadorCategoriaComponent {
  categoria: Categoria;
  


  @Output()
  categoriaSeleccionada = new EventEmitter<Categoria>();
  constructor(private categoriaService: CategoriaService) {
    this.categoria = new Categoria();

  }




  opcionesNombresCategoria: Categoria[] = [];
  mostrarOpcionesProductos = false;
  errorPRoducto: boolean = false;


  BuscarCategoriabyName(texto: string) {

    console.log('Texto escrito:', texto);

    this.categoriaService.filtrarCategoriasByName(texto).subscribe({
      next: (response: Categoria[]) => {
        // Si el backend devuelve directamente una lista de usernames
        this.opcionesNombresCategoria = response;
          this.errorPRoducto = false;

        console.log('Opciones de username:', this.opcionesNombresCategoria);
      },
      error: (error) => {
        console.error('Error al buscar categoria:', error);
        this.opcionesNombresCategoria = []; // Limpia opciones en caso de error
        this.errorPRoducto=true;
      }
    });


  }
  ocultarOpcionesCategoria() {
 setTimeout(() => {

      this.BuscarCategoriabyName(this.categoria.nombre
)
this.mostrarOpcionesProductos=false;

    
    }, 150);

  }



  seleccionarProducto(opcion: Categoria): void {
    this.categoria = opcion;

    

        this.categoriaSeleccionada.emit(opcion);

    this.BuscarCategoriabyName(opcion.nombre);

    this.opcionesNombresCategoria = [];



  }
}
