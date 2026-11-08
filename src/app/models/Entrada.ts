import { DetalleEntrada } from "./DetalleEntrada";
import { Proveedor } from "./Proveedor";
import { User } from "./User";

export class Entrada {
idEntrada!: number;
  proveedor: Proveedor = new Proveedor();
  user: User = new User();
  observaciones: string = '';

  detalles: DetalleEntrada[] = [];
}