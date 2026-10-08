import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paginacion',
  imports: [RouterModule],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent implements OnInit {
  ngOnInit(): void {
    console.log('PaginacionComponent  hola initialized with url:', this.url);
    this.visiblePages;
  }
    @Input() url: string = '';
  @Input() paginator:any={};
  @Input()size:number=5;



  blockSize: number = 5;
  
  // Tamaño del bloque de páginas visibles

  
get visiblePages(): number[] {
  
  const totalPages = this.paginator.page?.totalPages ?? 0!;
  const currentPage = this.paginator.page?.number ?? 0!;
  
  const count = Math.min(this.blockSize, totalPages);


  if (count === 0) return [];

  const start = Math.max(
    0,
    Math.min(currentPage - Math.floor(this.blockSize / 2), totalPages - count)
  );

  return Array.from({ length: count }, (_, index) => start + index);
}





}
