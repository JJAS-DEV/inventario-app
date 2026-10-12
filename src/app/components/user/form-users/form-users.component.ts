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

  constructor(private serviceUsers:UserService,private sharingUser: SharingUSerService, private route:ActivatedRoute) {
    this.user = new User();
    console.log("estoy en el constructor del form");
    console.log(this.errors);

  }
  ngOnInit(): void {


        this.sharingUser.errorFormEventEmitter.subscribe(error=>this.errors=error);

    //  this.route.paramMap.subscribe(params=>{
    //   const id:number=+(params.get('id')||'0');

    //   if(id>0){
    //     // this.SharingData.findUserByIdEventEmitter.emit(id);
    //     this.serviceUsers.findById(id).subscribe(user => {
    //       this.user = user;
    //     });

    //   }
    // }
    // )



  }

   onSubmit(userForm: NgForm): void {

    this.user.roles=[...this.selectedRolesList]

      this.sharingUser.newUserEventEmitter.emit(this.user);
    // if (userForm.valid) {
      console.log(this.user)
      this.sharingUser.addUser(this.user);

  

    // }


  }
  onClear(userForm: NgForm):void{
    userForm.reset();
    userForm.resetForm();

    
  }

  roles: Role[] = [{id:1,name:'ADMIN'}, {id:2,name:'USER'}, {id:3,name:'MANAGER'}]; // opciones disponibles
  selectedRolesList: Role[] = [];  


   

 toggleRole(role: Role): void {
    if (this.selectedRolesList.includes(role)) {
      // Si ya estaba seleccionado, lo quitamos
      this.selectedRolesList = this.selectedRolesList.filter(r => r !== role);
    } else {
      // Si no estaba, lo agregamos
      this.selectedRolesList.push(role);
    }
  }


}
