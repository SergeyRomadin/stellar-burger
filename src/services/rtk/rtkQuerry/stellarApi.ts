import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";

export interface IIngidient {
    id?: string;
    _id: string;
    name: string;
    type: "bun" | "main" | "sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export interface IOrderResponse {
    name: string;
    order: { number: number };
    success: boolean;
}

interface IIngredientsResponse {
    success: boolean;
    data: IIngidient[];
}

export const stellarApi = createApi({
    reducerPath: "stellarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://norma.nomoreparties.space/api",
    }),
    endpoints: (builder) => ({
        getIngredients: builder.query<IIngidient[], string>({
            query: () => `/ingredients`,
            transformResponse: (res: IIngredientsResponse) => {
                return res.data.map((el: IIngidient) => {
                    el.id = uuid();
                    return el;
                });
            },
        }),
        postOrder: builder.mutation<unknown, { ingredients: string[] }>({
            // note: an optional `queryFn` may be used in place of `query`
            query: (order) => ({
                url: `/orders`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(order),
            }),
        }),
    }),
});
