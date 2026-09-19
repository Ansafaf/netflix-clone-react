import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from 'react'
import { ROUTES } from "../constants/routes";
import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import { useAuth } from '../context/auth'
import Loader from "../components/loader";
import UserHome from "../pages/UserHome";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) return <Loader />
    return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />
}

function PublicOnlyRoute({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth()
    if (isLoading) return <Loader />
    return isAuthenticated ? <Navigate to={ROUTES.USER} replace /> : children
}

function AppRoutes(){
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
            <Route path={ROUTES.USER} element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
            {/* <Route path={ROUTES.MOVIES} element={}/> */}
        </Routes>
    )
}

export default AppRoutes;
