import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Login from "../pages/login";
import Home from "../pages/home";

function AppRoutes(){
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.REGISTER} element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;
