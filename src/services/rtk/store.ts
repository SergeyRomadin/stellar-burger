import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./igredientsSlice/ingredientsSlice";
import burgerComponentsReducer from "./burgerComponentsSlice/burgerComponentsSlice";

export const store = configureStore({
    reducer: {
        ingredientsSlice: ingredientsReducer,
        burgerComponentsSlice: burgerComponentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
