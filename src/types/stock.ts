import { ISKU } from "./sku";

export interface IStock {
  _id?: string;
  barcode: string;
  defaultSupplierPrice: number;
  defaultQuantity: number;
  description?: string;
  category?: string;
  skuPrefix: string;
  currency?: string;
  sku?: ISKU[];

  history?: [
    {
      date: any;
      quantity: number;
      reorderPoint?: number;
      reorderQuantity?: number;
      safetyStock?: number;
      reservedStock?: number;
      serviceLevel?: number;
      averageLeadTime?: number;
      maximumLeadTime?: number;
      maximumQuantity?: number;
    }
  ];
}
