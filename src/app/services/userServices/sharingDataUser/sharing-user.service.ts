import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SharingUSerService {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  private _errorFormEventEmitter = new EventEmitter();
  private _selectUserEventEmitter = new EventEmitter();



  constructor(private userservice: UserService, private router: Router) { }

  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }
  get errorFormEventEmitter(): EventEmitter<any> {
    return this._errorFormEventEmitter;
  }

  get selectUserEventEmitter(): EventEmitter<User> {
    return this._selectUserEventEmitter;

  }




  addUser(user: User) {

    if (user.id > 0) {

      this.userservice.update(user).subscribe({
        next: () => {

          Swal.fire({
            title: 'Usuario actualizado',
            text: 'Los cambios se guardaron correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['users/page/0/size/5']);
          });



        },
       error: (err) => {
          if (err.status == 400) {
            this.errorFormEventEmitter.emit(err.error);
            console.log(err.error);

            Swal.fire({
              title: 'Error de validación',
              text: 'Revisa los campos del formulario',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        }




      });


    } else {

      this.userservice.create(user).subscribe({

        next: () => {
          Swal.fire({
            title: 'Usuario creado',
            text: 'El usuario se registró correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['users/page/0/size/5']);
          });
        },
        error: (err) => {
          if (err.status == 400) {
            this.errorFormEventEmitter.emit(err.error);
            console.log(err.error);

            Swal.fire({
              title: 'Error de validación',
              text: 'Revisa los campos del formulario',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        }

      });
    }


  }

}
