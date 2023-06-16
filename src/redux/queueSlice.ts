import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Queue } from "../types/types";

const initialState: Queue = {
    id: "",
    tickets: [],
    front: null,
    rear: null,
};

export const queueSlice = createSlice({
    name: "queue",
    initialState,
    reducers: {
        setQueue: (state, action: PayloadAction<Queue>) => {
            state.id = action.payload.id;
            state.tickets = action.payload.tickets;
            state.front = action.payload.front;
            state.rear = action.payload.rear;
        },
        dequeue: (state) => {
            const updatedTickets = state.tickets.slice(1);
            const updatedFront = updatedTickets.length > 0 ? updatedTickets[0] : null;
            const updatedRear = updatedTickets.length > 0 ? updatedTickets[updatedTickets.length - 1] : null;

            state.tickets = updatedTickets;
            state.front = updatedFront;
            state.rear = updatedRear;
        }
    }
});

export const { setQueue, dequeue } = queueSlice.actions;
export default queueSlice.reducer;
