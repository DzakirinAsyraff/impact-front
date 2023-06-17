import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISKU } from "../types/sku";

interface SKUsState {
    skus: ISKU[];
}

const initialState: SKUsState = {
    skus: [],
};

export const skuSlice = createSlice({
    name: "sku",
    initialState,
    reducers: {
        setAllSKUs: (state, action: PayloadAction<ISKU[]>) => {
            state.skus = action.payload;
        },
        addSKU: (state, action: PayloadAction<ISKU>) => {
            state.skus.push(action.payload);
        },
    }
});

export const { setAllSKUs } = skuSlice.actions;
export default skuSlice.reducer;