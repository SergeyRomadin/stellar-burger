import { string } from "prop-types";

export type PostResponse = {
    success: boolean;
    message: string;
};

export type ConfirmNewPasswordBody = {
    password: string;
    token: string;
};

export type PostOrderResponse = {
    success: boolean;
    name: string;
    order: Order;
};

export type RegisterBody = {
    email?: string;
    password?: string;
    name?: string;
};

export type RegisterResponse = {
    success: boolean;
    user?: {
        email: string;
        name: string;
    };
    accessToken?: string;
    refreshToken?: string;
};
export type LoginBody = {
    email: string;
    password: string;
};
export type RefreshTokenBody = {
    token: string;
};
export type RefreshTokenResponse = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
};
export type GetUserResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
};

export type IngridientType = "bun" | "main" | "sauce";

export interface IIngidient {
    id?: string;
    _id: string;
    name: string;
    type: IngridientType;
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

export interface IIngredientsResponse {
    success: boolean;
    data: IIngidient[];
}

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
