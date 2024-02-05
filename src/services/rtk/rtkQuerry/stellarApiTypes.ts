import { string } from "prop-types";

export type PostResponse = {
    success: boolean;
    message: string;
};
export type ConfirmNewPasswordBody = {
    password: "";
    token: "";
};
export type RegisterBody = {
    email: string;
    password: string;
    name: string;
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
