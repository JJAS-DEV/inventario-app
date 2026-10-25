import { Proveedor } from "../models/Proveedor";
import { User } from "../models/User";

export class EntradaDto {
     idEntrada?: number;
  proveedor?: Proveedor;
  user?: User;
  fecha?: Date;
  numeroFactura?: string;

}
