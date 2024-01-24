import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

export function ProtectedRouteElement({ element }) {
    const { data: auth, isFetching } = stellarApi.useGetUserQuery();

    if (isFetching && !auth) {
        return null;
    }

    return auth?.success ? element : <Navigate to="/login" replace />;
}
