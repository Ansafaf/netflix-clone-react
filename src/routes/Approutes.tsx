import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Login from "../pages/login";

function AppRoutes(){
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
            <Route path={ROUTES.REGISTER} element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;
