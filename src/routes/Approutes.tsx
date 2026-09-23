import { Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from 'react'
import { ROUTES } from "../constants/routes";
import { useAuth } from '../context/auth'
import Loader from "../components/loader";
import {Suspense, lazy} from "react";


const Login = lazy(()=> import('../pages/login'));
const Home = lazy(()=> import('../pages/home'));
const Register = lazy(()=> import('../pages/register'));
const MovieDetail = lazy(()=> import('../pages/movieDetails'));
const UserHome = lazy(()=> import('../pages/UserHome'));
const NotFound = lazy(()=> import('../pages/notFound'));

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
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<PublicOnlyRoute><Login/></PublicOnlyRoute>} />
            <Route path={ROUTES.HOME} element={<PublicOnlyRoute><Home/> </PublicOnlyRoute>} />
            <Route path={ROUTES.REGISTER} element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
            <Route path={ROUTES.USER} element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
            <Route path={ROUTES.MOVIE} element={<ProtectedRoute><MovieDetail/></ProtectedRoute>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
    )
}

export default AppRoutes;
