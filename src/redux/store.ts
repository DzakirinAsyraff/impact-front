import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';
import queueSlice from './queueSlice';
import productSlice  from './productSlice';




export const store = configureStore({
    reducer: {
        counter: counterSlice,
        queue: queueSlice,
        product: productSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;