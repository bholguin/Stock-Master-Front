import { Route, Routes, useNavigate } from "react-router-dom";
import { lazy, useMemo } from "react";
import { Layout, LayoutStore } from "layout";
import { UsuarioServices } from "services/usuario";
import { useAxiosConfig } from "config/axios";

const LoginPage = lazy(() => import("../pages/login/login-page/login-page"))
const ValidateUsernamePage = lazy(() => import("../pages/login/validate-username-page/validate-username-page"))
const ValidateLoginPage = lazy(() => import("../pages/login/validate-login-page/validate-login-page"))
const Home = lazy(() => import("../screens/home/home-screen"))
const UsuariosPage = lazy(() => import("../pages/usuarios/usuarios-page"))

export const AppRoutes = () => {
    useAxiosConfig()
    const navigate = useNavigate()
    const usuarios = useMemo(() => new UsuarioServices(), [])
    const store = useMemo(() => new LayoutStore(
        usuarios,
        navigate
    ), [usuarios, navigate])
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}>
                <Route index element={<ValidateUsernamePage />}></Route>
                <Route path="/login" element={<ValidateLoginPage />}></Route>
            </Route>
            <Route path="/app" element={<Layout store={store} />}>
                <Route index element={<Home />}></Route>
                <Route path="usuarios" element={<UsuariosPage />}></Route>
            </Route>
        </Routes>
    )
};
