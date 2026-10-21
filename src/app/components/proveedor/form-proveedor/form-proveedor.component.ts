import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../../models/Proveedor';
import { FormsModule, NgForm } from '@angular/forms';
import { EventosService } from '../../../services/proveevorService/ProveedorEvento/eventos.service';
import { SharingUSerService } from '../../../services/userServices/sharingDataUser/sharing-user.service';
import { ProveedorService } from '../../../services/proveevorService/proveedor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-proveedor',
  imports: [FormsModule],
  templateUrl: './form-proveedor.component.html',
  styleUrl: './form-proveedor.component.css'
})
export class FormProveedorComponent implements OnInit {

  proveedor: Proveedor;
  errors: any = {};

  constructor(private service: EventosService, private sharingUser: SharingUSerService, private route: ActivatedRoute,private serviceProveedor:ProveedorService) {
    this.proveedor = new Proveedor();
    this.proveedor.activo = true;

  }
  ngOnInit(): void {

    
     this.route.paramMap.subscribe(params=>{
      const id:number=+(params.get('id')||'0');

      if(id>0){
        // this.SharingData.findUserByIdEventEmitter.emit(id);
        this.proveedor.idProveedor=id;
        this.serviceProveedor.findById(id).subscribe(proveedor => {

        this.proveedor=proveedor;
        });

        this.editar=true;

      }
    }
    )


    this.sharingUser.errorFormEventEmitter.subscribe(error => this.errors = error);

    console.log("estoy en el constructor del form");
    console.log(this.errors);
  }

  onSubmit(userForm: NgForm): void {
    console.log(this.proveedor)


    this.service.addProveedor(this.proveedor);



    // }

  }


  editar: boolean = false;

  onClear(userForm: NgForm): void {



  }




}
