import { Routes } from "@angular/router";
import { EntradasComponent } from "../components/entradas/entradas.component";
import { FormEntradasComponent } from "../components/entradas/form-entradas/form-entradas.component";

export const routersEntradas: Routes =
    [
        {
                path: 'entradad/page/:page/size/:size',
                component: EntradasComponent
            },

            {
                path: 'entradadform',
                component: FormEntradasComponent
            }


               
                


    ];