import { Navigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

export function ProtectedRouteElement({ element, fromAuth }) {
    const { data: auth, isError, isFetching } = stellarApi.useGetUserQuery();

    if (isFetching) return null;

    if (fromAuth) return auth?.success ? <Navigate to="/" replace /> : element;

    if (isError) return <Navigate to="/login" replace />;

    return auth?.success ? element : <Navigate to="/login" replace />;
}
