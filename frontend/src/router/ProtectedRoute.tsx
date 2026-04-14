import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import type { JSX } from "react";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isAuth } = useAuth();
    // if (!AuthService.is_auth()) {
    //     return <Navigate to="/login" />;
    // }
    return isAuth ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;