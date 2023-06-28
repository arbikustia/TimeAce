import { configureStore } from "@reduxjs/toolkit"
import { statusSlice } from "./Features/CheckTimerSlice";

const store = configureStore({
    reducer: {
        statusPlay : statusSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
