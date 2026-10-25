import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { routersUSers } from './Routers/app.routes.users';
import { routersProveedor } from './Routers/app.routes.proveedor';
import { EntradasComponent } from './components/entradas/entradas.component';
import { routersEntradas } from './Routers/app.routes.entradas';

export const routes: Routes = [

        ...routersUSers,
        ...routersEntradas,
        ...routersProveedor,
              { path: '', component: InicioComponent, pathMatch: 'full' },


    
];
