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
    RefreshTokenBody,
    RefreshTokenResponse,
    RegisterBody,
    RegisterResponse,
} from "./stellarApiTypes";
import { getCookie, setCookie } from "../../../utils/functions";

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

const stellatQuery = retry(
    async (args: string | FetchArgs, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: "https://norma.nomoreparties.space/api",
            prepareHeaders: (headers) => {
                headers.set("Authorization", `${getCookie("token")}`);
                return headers;
            },
        })(args, api, extraOptions);

        if (result.error?.status === 401) {
            api.dispatch(stellarApi.endpoints.refreshToken);
        }
        return result;
    },
    { maxRetries: 5 }
);

export const stellarApi = createApi({
    reducerPath: "stellarApi",
    baseQuery: stellatQuery,
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
            query: (order) => ({
                url: `/orders`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(order),
            }),
        }),
        resetPassword: builder.mutation<PostResponse, string>({
            query: (email) => ({
                url: `/password-reset`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ email }),
            }),
        }),
        confirmNewPass: builder.mutation<PostResponse, ConfirmNewPasswordBody>({
            query: (body) => ({
                url: `/password-reset/reset`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(body),
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterBody>({
            query: (body) => ({
                url: `auth/register`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(body),
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        setCookie("refreshToken", data.refreshToken);
                        setCookie("accessToken", data.accessToken);
                    }
                } catch (err) {}
            },
        }),
        logout: builder.mutation<RegisterResponse, RegisterBody>({
            query: (body) => ({
                url: `/auth/logout`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    // Authorization: "Bearer " + getCookie("token"),
                },
                body: JSON.stringify({ token: getCookie("refreshToken") }),
            }),
        }),
        login: builder.mutation<RegisterResponse, LoginBody>({
            query: (body) => ({
                url: `/auth/login`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(body),
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        setCookie("refreshToken", data.refreshToken);
                        setCookie("token", data.accessToken);
                    }
                } catch (err) {}
            },
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, undefined>({
            query: () => ({
                url: `/auth/logout`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({ token: getCookie("refreshToken") }),
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        setCookie("token", data.accessToken);
                    }
                } catch (err) {}
            },
        }),
        getUser: builder.query<GetUserResponse, undefined>({
            query: () => ({
                url: `/auth/user`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                Authorization: getCookie("token"),
            }),
        }),
    }),
});
