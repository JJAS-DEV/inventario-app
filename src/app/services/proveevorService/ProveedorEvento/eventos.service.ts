import { Injectable } from '@angular/core';
import { Proveedor } from '../../../models/Proveedor';
import { ProveedorService } from '../proveedor.service';
import { SharingUSerService } from '../../userServices/sharingDataUser/sharing-user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private serviceuser: SharingUSerService, private service: ProveedorService, private router: Router) { }

  addProveedor(proveedor: Proveedor): void {
    if (proveedor.idProveedor > 0) {
      this.service.update(proveedor).subscribe({
        next: () => {

          Swal.fire({
            title: 'Usuario actualizado',
            text: 'Los cambios se guardaron correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['proveedor/page/0/size/5']);
          });



        },
        error: (err) => {
          if (err.status == 400) {
            this.serviceuser.errorFormEventEmitter.emit(err.error);
            console.log(err.error);

            Swal.fire({
              title: 'Error de validación',
              text: 'Revisa los campos del formulario',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          } else {
            console.error(err);

            Swal.fire({
              title: 'Error inesperado',
              text: err.error?.message || 'Ocurrió un problema en el servidor',
              icon: 'warning',
              confirmButtonText: 'Cerrar'
            });
          }
        }




      });
    } else {

      this.service.create(proveedor).subscribe({


        next: () => {
          Swal.fire({
            title: 'Usuario creado',
            text: 'El usuario se registró correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['proveedor/page/0/size/5']);
          });
        },
        error: (err) => {
          if (err.status == 400) {
            this.serviceuser.errorFormEventEmitter.emit(err.error);
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


  eliminarById(id: number): void {

    Swal.fire({
      title: '¿Seguro que quieres eliminarlo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El usuario fue eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'OK'

            });
            this.router.navigate(['']).then(() => {
              // aquí ya estás en la ruta nueva
              // luego vuelves a la ruta anterior
              this.router.navigate(['/proveedor/page/0/size/5']);
            });
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Error al eliminar',
              text: err.error?.message || 'Ocurrió un problema en el servidor',
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        });
      }
    });
  }





}
