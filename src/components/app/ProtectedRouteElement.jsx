import { Navigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";
import { useEffect } from "react";

export function ProtectedRouteElement({ element, fromAuth }) {
    const {
        data: auth,
        isError,
        isFetching,
        refetch: getUser,
        isLoading,
    } = stellarApi.useGetUserQuery();

    if (isFetching || isLoading) return null;
    // if (isError) return <Navigate to="/login" replace />;
    // if (!auth) return null;

    if (fromAuth) return auth?.success ? <Navigate to="/" replace /> : element;

    return auth?.success ? element : <Navigate to="/login" replace />;
}
