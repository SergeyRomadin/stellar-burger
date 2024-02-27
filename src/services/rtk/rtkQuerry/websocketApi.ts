import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrdersResponse } from "./stellarApiTypes";
import { getCookie } from "../../../utils/functions";

export const websocketApi = createApi({
    reducerPath: "websoketApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
    }),
    endpoints: (builder) => ({
        getOrders: builder.query<OrdersResponse, void | string>({
            queryFn: (url) => ({
                data: { success: true, totalToday: 0, total: 0, orders: [] },
            }),
            async onCacheEntryAdded(
                url,
                {
                    updateCachedData,
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    dispatch,
                }
            ) {
                const ws = new WebSocket(
                    `wss://norma.nomoreparties.space/orders${
                        url ??
                        "?token=" + getCookie("token")?.replace("Bearer ", "")
                    }`
                );
                try {
                    const listener = (event: MessageEvent) => {
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
