import { IProduct } from "./product";
import { IStock } from "./stock";

export interface ISales {
  _id?: string;
  price: number;
  countInStock?: number;
  stock?: IStock[];

  dailySales?: [
    {
      date: any;
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
