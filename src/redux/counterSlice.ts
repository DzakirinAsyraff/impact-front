import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Counter } from "../types/types";
import { socket } from '../socket'
import { Ticket } from "../types/types";

interface CounterState {
    counters : Counter[]
}

const initialState: CounterState = {
    counters: []
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        setAllCounters: (state, action: PayloadAction<Counter[]>) => {
            state.counters = action.payload;
        },
        setACounter: (state, action: PayloadAction<Counter>) => {
            const index = state.counters.findIndex((counter)=> counter.ind === action.payload.ind);
            const newCounters = [...state.counters];
            newCounters[index] = action.payload;
            state.counters = newCounters;
        },
    }
});

export const { setAllCounters, setACounter } = counterSlice.actions;
export default counterSlice.reducer;