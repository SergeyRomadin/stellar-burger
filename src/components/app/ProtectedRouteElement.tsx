import { Navigate } from "react-router-dom";
import { stellarApi } from "../../services/rtk/rtkQuerry/stellarApi";

type Props = { element: JSX.Element; fromAuth?: boolean };

export function ProtectedRouteElement({ element, fromAuth }: Props) {
    const { data: auth, isFetching, isLoading } = stellarApi.useGetUserQuery();

    if (isFetching || isLoading) return null;
    // if (isError) return <Navigate to="/login" replace />;
    // if (!auth) return null;

    if (fromAuth) return auth?.success ? <Navigate to="/" replace /> : element;

    return auth?.success ? element : <Navigate to="/login" replace />;
}
