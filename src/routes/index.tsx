import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const LoginPage = lazy(() => import("../pages/login/login-page/login-page"))
const ValidateUsernamePage = lazy(() => import("../pages/login/validate-username-page/validate-username-page"))
const ValidateLoginPage = lazy(() => import("../pages/login/validate-login-page/validate-login-page"))
const Home = lazy(() => import("../screens/home/home-screen"))
const UsuariosPage = lazy(() => import("../pages/usuarios/usuarios-page"))

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} loader={async () => {
                return await new Promise((res) => setTimeout(res, 5000));
            }}>
                <Route index element={<ValidateUsernamePage />}></Route>
                <Route path="/login" element={<ValidateLoginPage />}></Route>
            </Route>
            <Route path="/usuarios" element={<UsuariosPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
        </Routes>
    )
};
