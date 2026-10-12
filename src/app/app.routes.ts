import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { routersUSers } from './app.routes.users';

export const routes: Routes = [

        ...routersUSers,
              { path: '', component: InicioComponent, pathMatch: 'full' },


    
];
