import { Route, Routes, useNavigate } from "react-router-dom";
import { FC, lazy, useMemo } from "react";
import { Layout, LayoutStore } from "layout";
import { UsuarioServices } from "services/usuario";
import { Configuration } from "screens/configuration";

const LoginPage = lazy(() => import("../pages/login/login-page/login-page"))
const ValidateUsernamePage = lazy(() => import("../pages/login/validate-username-page/validate-username-page"))
const ValidateLoginPage = lazy(() => import("../pages/login/validate-login-page/validate-login-page"))
const HomePage = lazy(() => import("../pages/home/home-page"))
const EmpresasPage = lazy(() => import("../pages/configuration/empresas/empresas-page"))
const UsuariosPage = lazy(() => import("../pages/configuration/usuarios/usuarios-page"))
const VehiculosPage = lazy(() => import("../pages/configuration/vehiculos/vehiculos-page"))
const CreateVehiculosPage = lazy(() => import("../pages/configuration/vehiculos/create-vehiculo-page"))
const UpdateVehiculosPage = lazy(() => import("../pages/configuration/vehiculos/update-vehiculo-page"))

export const AppRoutes: FC = () => {
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
                <Route index element={<HomePage />}></Route>
                <Route path="configuration" element={<Configuration />}>
                    <Route path="empresas" element={<EmpresasPage />} />
                    <Route path="usuarios" element={<UsuariosPage />} />
                    <Route path="vehiculos" element={<VehiculosPage />} >
                        <Route path="create" element={<CreateVehiculosPage />} />
                        <Route path=":vehiculo_id" element={<UpdateVehiculosPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
};
