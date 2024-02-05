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
import { Order } from "./websocketApi";

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
        const endpointsCondition =
            api.endpoint !== "refreshToken" &&
            api.endpoint !== "login" &&
            api.endpoint !== "register" &&
            getCookie("refreshToken");

        if (!getCookie("token") && endpointsCondition) {
            console.log("net cocki");
            console.log(api.endpoint);
            await api.dispatch(
                stellarApi.endpoints.refreshToken.initiate(undefined)
            );
        }

        const result = await fetchBaseQuery({
            baseUrl: "https://norma.nomoreparties.space/api",
            prepareHeaders: (headers) => {
                if (getCookie("token"))
                    headers.set("Authorization", `${getCookie("token")}`);
                return headers;
            },
        })(args, api, extraOptions);

        if (result.error && !getCookie("token") && !getCookie("refreshToken"))
            retry.fail(result.error);

        if (
            (result.error?.status === 401 || result.error?.status === 403) &&
            endpointsCondition &&
            getCookie("token")
        ) {
            await api.dispatch(
                stellarApi.endpoints.refreshToken.initiate(undefined)
            );
        }

        return result;
    },
    { maxRetries: 0 }
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
        getOrder: builder.query<Order, string>({
            query: (orderId) => `/orders/${orderId}`,
            transformResponse: (res: { orders: Order[] }) => {
                return res.orders[0];
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
                        setCookie("token", data.accessToken, {
                            "max-age": 1200,
                        });
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
                },
                body: JSON.stringify({ token: getCookie("refreshToken") }),
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success) {
                        deleteCookie("refreshToken");
                        deleteCookie("token");
                        dispatch(stellarApi.util.resetApiState());
                        await dispatch(stellarApi.endpoints.getUser.initiate());
                    }
                } catch (err) {
                } finally {
                }
            },
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
                        setCookie("token", data.accessToken, {
                            "max-age": 1200,
                        });
                    }
                } catch (err) {
                } finally {
                    dispatch(stellarApi.endpoints.getUser.initiate());
                }
            },
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, undefined>({
            query: () => ({
                url: `/auth/token`,
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
                        setCookie("token", data.accessToken, {
                            "max-age": 1200,
                        });
                        setCookie("refreshToken", data.refreshToken);
                    }
                } catch (err) {}
            },
        }),
        getUser: builder.query<GetUserResponse, void>({
            query: () => ({
                url: `/auth/user`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                Authorization: getCookie("token"),
            }),
        }),
        patchUser: builder.mutation<GetUserResponse, RegisterBody>({
            query: (body) => ({
                url: `/auth/user`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                Authorization: getCookie("token"),
                body: JSON.stringify(body),
            }),
        }),
    }),
});
