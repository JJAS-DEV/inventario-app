import { Routes } from "@angular/router";
import { ProveedorComponent } from "./components/proveedor/proveedor.component";

export const routersProveedor: Routes =
    [
        {
                path: 'proveedor/page/:page/size/:size',
                component: ProveedorComponent
            }


    ];