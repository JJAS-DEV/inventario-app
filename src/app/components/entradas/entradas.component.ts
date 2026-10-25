import { Component, OnInit } from '@angular/core';
import { EntradaDto } from '../../Dto/EntradaDto';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaServiceService } from '../../services/Entrada/entrada-service.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';

@Component({
  selector: 'app-entradas',
  imports: [PaginacionComponent],
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent  implements OnInit {
  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page') ?? 0);
      this.cargarEntradas();
    });
    

  }


  
   constructor(private router: Router, private service: EntradaServiceService,   private route: ActivatedRoute

  ) {
  
  }
  entradas: EntradaDto[] = [];
  paginator: any = {};
  size: number = 5;
  page: number = 0;
  total:number=0;
  url:string="/entradad/page"



    private cargarEntradas(): void {
     this.service.findAllPageable(this.page,this.size).subscribe(pageable => {
          this.entradas = pageable.content as [];
          this.paginator = pageable;
  
          this.total = this.entradas.length
        });
    }



}
