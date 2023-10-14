import { configureStore } from "@reduxjs/toolkit";
import burgerComponentsReducer from "./burgerComponentsSlice/burgerComponentsSlice";
import { stellarApi } from "./rtkQuerry/stellarApi";

export const store = configureStore({
    reducer: {
        burgerComponentsSlice: burgerComponentsReducer,
        [stellarApi.reducerPath]: stellarApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stellarApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
