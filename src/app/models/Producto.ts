import { Categoria } from "./Categoria";
import { Proveedor } from "./Proveedor";

export class Producto {
  
  idProducto!: number;
  sku!: string;
  nombre!: string
  descripcion!: string;
  precioCompra!: number;
  precioVenta!: number;
  stockMinimo!: number;
  proveedor!:Proveedor;
  stock!: number;
  activo!: boolean;
  categoria!:Categoria;
}