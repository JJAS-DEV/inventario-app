export class Producto {
  idProducto!: number;
  sku!: string;
  nombre: string="";
  descripcion!: string;
  precioCompra!: number;
  precioVenta!: number;
  stockMinimo!: number;
  creadoEn!: string;
  nombreProveedor!:string;
  
  stock!: number;
  activo!: boolean;
}