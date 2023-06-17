import { ISales } from "./sales";
import { IStock } from "./stock";

export interface IProduct {
    _id?: string;
    name: string;
    barcode: string;
    description: string;
    category: string;
    stock?: IStock;
    sales?: ISales;
    [key: string]: any;
  }