import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [

              { path: '', component: InicioComponent, pathMatch: 'full' },

{
     path: 'users/page/:page/size/:size',
        component: UserComponent
}
    
];
