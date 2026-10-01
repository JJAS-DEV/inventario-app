import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../services/userServices/user-service.service';
import { PaginacionComponent } from '../paginacion/paginacion.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user',
  imports: [PaginacionComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit {

  
  users: User[] = [];
  paginator:any={};
  url:string="/users/page"
  size:number=5;
  constructor(private router: Router, private service: UserService,
     private route: ActivatedRoute
  ){
    
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
  this.service.findAllPageable(this.page, this.size).subscribe(pageable => {
    this.users = pageable.content as User[];
    this.paginator = pageable;
  });
}
  
}
