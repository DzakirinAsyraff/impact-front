import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types/product";
import { IStock } from "../types/stock";
import { ISales } from "../types/sales";

interface ProductState {
    products: IProduct[];
}

const initialState: ProductState = {
    products: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        setAProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.products.findIndex((product) => product.name === action.payload.name);
            const newProducts = [...state.products];
            newProducts[index] = action.payload;
            state.products = newProducts;
        },
        // given list of stocks, update the stock with the same id
        updateStock: (state, action: PayloadAction<IStock[]>) => {
            const newProducts = [...state.products];
            action.payload.forEach((stock) => {
                console.log("in update stock", stock);
                const index = newProducts.findIndex((product) => product.stock === stock._id);
                newProducts[index].stock = stock;
            });
            state.products = newProducts;
        },
        updateSales: (state, action: PayloadAction<ISales[]>) => {
            const newProducts = [...state.products];
            action.payload.forEach((sales) => {
                console.log("in update sales", sales);
                const index = newProducts.findIndex((product) => product.sales === sales._id);
                newProducts[index].sales = sales
            });
            state.products = newProducts;
        }
            
    }
});

export const { setAllProducts, setAProduct, updateStock, updateSales } = productSlice.actions;
export default productSlice.reducer;