import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../user-service.service';
import { Router } from '@angular/router';

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

   get selectUserEventEmitter ():EventEmitter<User>{
    return this._selectUserEventEmitter;

  }




  addUser(user: User) {


    this.userservice.create(user).subscribe({
      next: () => {

        this.router.navigate(['users/page/0/size/5'])


      },
      error: (err) => {
        if (err.status == 400) {
          this.errorFormEventEmitter.emit(err.error);
          console.log(err.error);
        }

      }

    });
  }

}
