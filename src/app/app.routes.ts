import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { routersUSers } from './app.routes.users';
import { routersProveedor } from './app.routes.proveedor';

export const routes: Routes = [

        ...routersUSers,
        ...routersProveedor,
              { path: '', component: InicioComponent, pathMatch: 'full' },


    
];
