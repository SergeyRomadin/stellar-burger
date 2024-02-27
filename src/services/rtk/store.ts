import { configureStore } from "@reduxjs/toolkit";
import burgerComponentsReducer from "./burgerComponentsSlice/burgerComponentsSlice";
import { stellarApi } from "./rtkQuerry/stellarApi";
import { websocketApi } from "./rtkQuerry/websocketApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        burgerComponentsSlice: burgerComponentsReducer,
        [stellarApi.reducerPath]: stellarApi.reducer,
        [websocketApi.reducerPath]: websocketApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            stellarApi.middleware,
            websocketApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
