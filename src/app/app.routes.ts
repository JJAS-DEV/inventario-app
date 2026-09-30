import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
{
     path: 'users/page/:page',
        component: UserComponent
}
    
];
