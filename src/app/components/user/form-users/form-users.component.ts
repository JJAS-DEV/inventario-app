import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../models/User';
import { SharingUSerService } from '../../../services/userServices/sharingDataUser/sharing-user.service';
import { JsonPipe } from '@angular/common';
import { Role } from '../../../models/Role';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/userServices/user-service.service';

@Component({
  selector: 'app-form-users',
  imports: [FormsModule,JsonPipe],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})
export class FormUsersComponent implements OnInit {
  user: User;
  errors: any = {};
  editar:boolean=false;

  constructor(private serviceUsers:UserService,private sharingUser: SharingUSerService, private route:ActivatedRoute) {
    this.user = new User();
    console.log("estoy en el constructor del form");
    console.log(this.errors);

  }
  ngOnInit(): void {


        this.sharingUser.errorFormEventEmitter.subscribe(error=>this.errors=error);
        this.serviceUsers.rolesALl().subscribe(role=>{
          this.roles=role
        })

     this.route.paramMap.subscribe(params=>{
      const id:number=+(params.get('id')||'0');

      if(id>0){
        // this.SharingData.findUserByIdEventEmitter.emit(id);
        this.serviceUsers.findById(id).subscribe(user => {
          this.user = user;
          this.selectedRolesList=[...this.user.roles]
        });

        this.editar=true;

      }
    }
    )



  }

   onSubmit(userForm: NgForm): void {

    this.user.roles=[...this.selectedRolesList]

    // if (userForm.valid) {
      console.log(this.user)


      this.sharingUser.addUser(this.user);

  

    // }


  }
  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();
    this.selectedRolesList=[]

    
  }

  roles: Role[] = []; // opciones disponibles
  selectedRolesList: Role[] = [];  


   

toggleRole(role: Role): void {
  if (this.selectedRolesList.some(r => r.id === role.id)) {
    this.selectedRolesList = this.selectedRolesList.filter(r => r.id !== role.id);
  } else {
    this.selectedRolesList.push(role);
  }
}
isRoleSelected(role: Role): boolean {
  return this.selectedRolesList.some(r => r.id === role.id);
}

}
