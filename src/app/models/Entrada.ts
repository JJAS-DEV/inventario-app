import { DetalleEntrada } from "./DetalleEntrada";
import { Proveedor } from "./Proveedor";
import { User } from "./User";

export class Entrada {
idEntrada: number = 0;
  proveedor: Proveedor = new Proveedor();
  user: User = new User();
  fecha: string = '';
  numeroFactura: string = '';
  observaciones: string = '';

  detalleEntradas: DetalleEntrada[] = [];
}