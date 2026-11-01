export interface Producto {
  idProducto: number;
  sku: string;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  precioVenta: number;
  stockMinimo: number;
  creadoEn: string;
  stock: number;
  activo: boolean;
}