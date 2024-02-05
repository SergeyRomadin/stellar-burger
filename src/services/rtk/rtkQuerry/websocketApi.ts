import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
    retry,
} from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";
import {
    ConfirmNewPasswordBody,
    GetUserResponse,
    LoginBody,
    PostResponse,
    RefreshTokenResponse,
    RegisterBody,
    RegisterResponse,
} from "./stellarApiTypes";
import { deleteCookie, getCookie, setCookie } from "../../../utils/functions";

export type Order = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};
export type OrdersResponse = {
    success: boolean;
    total: number;
    totalToday: number;
    orders: Order[];
};

export const websocketApi = createApi({
    reducerPath: "websoketApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    endpoints: (builder) => ({
        getUserOrders: builder.query<OrdersResponse, void>({
            queryFn: () => ({
                data: { success: false, totalToday: 0, total: 0, orders: [] },
            }),
            async onCacheEntryAdded(
                arg,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                }
            ) {
                const ws = new WebSocket(
                    `wss://norma.nomoreparties.space/orders?token=${getCookie(
                        "token"
                    )?.replace("Bearer ", "")}`
                );
                try {
                    const listener = (event: MessageEvent) => {
                        console.log(event);
                        const data: OrdersResponse = JSON.parse(event.data);
                        // if (!data) return;
                        updateCachedData((draft) => {
                            if (
                                data.total === draft.total &&
                                data.orders[0].status === draft.orders[0].status
                            )
                                return;
                            return data;
                            // if (!draft) draft = data;
                            // else {
                            //     draft.push(data);
                            // }
                        });
                    };

                    ws.addEventListener("message", listener);
                } catch (e) {
                    console.log(e);
                }
                await cacheEntryRemoved;
                ws.close();
            },
        }),
        getOrdersFeed: builder.query<OrdersResponse, void>({
            queryFn: () => ({
                data: { success: false, totalToday: 0, total: 0, orders: [] },
            }),
            async onCacheEntryAdded(
                arg,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                }
            ) {
                const ws = new WebSocket(
                    "wss://norma.nomoreparties.space/orders/all"
                );
                try {
                    const listener = (event: MessageEvent) => {
                        console.log(event);
                        const data: OrdersResponse = JSON.parse(event.data);
                        // if (!data) return;
                        updateCachedData((draft) => {
                            if (
                                data.total === draft.total &&
                                data.orders[0].status === draft.orders[0].status
                            )
                                return;
                            return data;
                            // if (!draft) draft = data;
                            // else {
                            //     draft.push(data);
                            // }
                        });
                    };

                    ws.addEventListener("message", listener);
                } catch (e) {
                    console.log(e);
                }
                await cacheEntryRemoved;
                ws.close();
            },
        }),
    }),
});
