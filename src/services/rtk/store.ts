import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./igredientsSlice/ingredientsSlice";

export const store = configureStore({
    reducer: {
        ingredientsSlice: ingredientsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
