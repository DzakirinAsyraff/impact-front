import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';
import queueSlice from './queueSlice';




export const store = configureStore({
    reducer: {
        counter: counterSlice,
        queue: queueSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;