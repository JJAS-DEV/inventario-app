import { Routes } from "@angular/router";
import { FormUsersComponent } from "../components/user/form-users/form-users.component";
import { UserComponent } from "../components/user/user.component";


export const routersUSers: Routes =
    [{
        path: 'usersForm',
        component: FormUsersComponent
    },
    {
        path: 'users/page/:page/size/:size',
        component: UserComponent
    },
    {
        path: 'users/edit/:id',
        component: FormUsersComponent,
    }


    ];