import { Navigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

export function ProtectedRouteElement({ element }) {
    const { data: auth } = stellarApi.useGetUserQuery();

    if (!auth) return null;

    return auth?.success ? element : <Navigate to="/login" replace />;
}
