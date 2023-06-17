import { IProduct } from "./product";
import { IStock } from "./stock";

export interface ISales{
    _id?: string;
    product?: IProduct;
    price: number;
    countInStock?: number;
    stock?: IStock[];
  
    dailySales?: [
      {
        date: Date;
        quantity: number;
        total: number;
      }
    ];
  
    averageDailyDemand?: number;
    maximumDailyDemand?: number;
    totalProductSold?: number;
    totalSale?: number;
    commulativeNET?: number;
  }