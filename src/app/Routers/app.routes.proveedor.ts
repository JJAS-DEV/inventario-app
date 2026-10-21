import { Routes } from "@angular/router";
import { ProveedorComponent } from "../components/proveedor/proveedor.component";
import { FormProveedorComponent } from "../components/proveedor/form-proveedor/form-proveedor.component";

export const routersProveedor: Routes =
    [
        {
                path: 'proveedor/page/:page/size/:size',
                component: ProveedorComponent
            },

            {
                    path: 'ProvedorForm',
                    component: FormProveedorComponent
                },

                {
                    path: 'proveedor/edit/:id',
                    component: FormProveedorComponent
                }
               
                


    ];