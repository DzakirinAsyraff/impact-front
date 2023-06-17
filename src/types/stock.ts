import { ISKU } from "./sku";

export interface IStock {
    _id?: string;
    barcode: string;
    defaultSupplierPrice: number;
    defaultQuantity: number;
    description?: string;
    category?: string;
    skuPrefix: string;

    sku?: ISKU[];

    reorderPoint?: number;
    reorderQuantity?: number;
    currency?: string;
    safetyStock?: number;
    reservedStock?: number;
    serviceLevel?: number;
    averageLeadTime?: number;
    maximumLeadTime?: number;
    maximumQuantity?: number;
}