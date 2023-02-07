import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const { currentUser } = useAuth()

    if (!currentUser) return <Navigate to="/login" />

    return children;
}