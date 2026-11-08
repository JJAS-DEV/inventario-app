import { DetalleEntrada } from "../models/DetalleEntrada";
import { Proveedor } from "../models/Proveedor";
import { User } from "../models/User";

export class Entrada {
idEntrada!: number;
  proveedor: Proveedor = new Proveedor();
  user: User = new User();
  numeroFactura!: string; 
  observaciones: string = '';

  detalles: DetalleEntrada[] = [];
}