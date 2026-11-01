import { Producto } from "./Producto";

export class DetalleEntrada {
  idDetalleEntrada?: number;
  entradaId?: number;
  producto!: Producto;
  cantidad!: number;
  precioCompra!: number;
}