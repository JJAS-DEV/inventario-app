import { Routes } from "@angular/router";
import { EntradasComponent } from "../components/entradas/entradas.component";

export const routersEntradas: Routes =
    [
        {
                path: 'entradad/page/:page/size/:size',
                component: EntradasComponent
            }
               
                


    ];