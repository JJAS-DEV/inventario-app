import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/Proveedor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../services/proveevorService/proveedor.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  imports: [PaginacionComponent,FormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {

  proveedor: Proveedor[] = [];
  paginator: any = {};
  url: string = "/proveedor/page"
  size: number = 5;
  private page = 0;
  total:number=0;

  constructor(private router: Router, private service: ProveedorService,
    private route: ActivatedRoute

  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page') ?? 0);
      this.cargarProveedor();
    });
  }

  private cargarProveedor(): void {
    this.service.findAllPageable(this.page, this.size).subscribe(pageable => {
      this.proveedor = pageable.content as Proveedor[];
      this.paginator = pageable;

      this.total=this.proveedor.length
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
    this.cargarProveedor();          // conserva la página obtenida de la URL
  }


  

}
