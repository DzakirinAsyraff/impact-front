export interface ISKU {
    _id?: string;
    product: string;
    sku: string;
    supplierPrice: number;
    supplierPricePerUnit: number;
    quantityProductInStock: number;
    orderAt: Date;
    dispatchAt: Date;
    createdAt: Date;
    leadTime: number;
    canDispatch: boolean;
}