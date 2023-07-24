import { Route, Routes, useNavigate } from "react-router-dom";
import { FC, lazy, useEffect, useMemo } from "react";
import { Layout, LayoutStore } from "layout";
import { UsuarioServices } from "services/usuario";
import { Configuration } from "screens/configuration";
import { AuthServices } from "services/auth";

const Perfil = lazy(() => import("../screens/perfil/perfil"))
const CuentaPage = lazy(() => import("../pages/perfil/cuenta/cuenta-page"))
const SeguridadPage = lazy(() => import("../pages/perfil/seguridad/seguridad-page"))
const LoginPage = lazy(() => import("../pages/login/login-page/login-page"))
const ValidateUsernamePage = lazy(() => import("../pages/login/validate-username-page/validate-username-page"))
const ValidateLoginPage = lazy(() => import("../pages/login/validate-login-page/validate-login-page"))
const HomePage = lazy(() => import("../pages/home/home-page"))
const EmpresasPage = lazy(() => import("../pages/configuration/empresas/empresas-page"))
const UsuariosPage = lazy(() => import("../pages/configuration/usuarios/usuarios-page"))
const CreateUsuarioPage = lazy(() => import("../pages/configuration/usuarios/create-usuario-page"))
const UpdateUsuarioPage = lazy(() => import("../pages/configuration/usuarios/update-usuario-page"))
const VehiculosPage = lazy(() => import("../pages/configuration/vehiculos/vehiculos-page"))
const CreateVehiculosPage = lazy(() => import("../pages/configuration/vehiculos/create-vehiculo-page"))
const UpdateVehiculosPage = lazy(() => import("../pages/configuration/vehiculos/update-vehiculo-page"))
const UnidadesMedidasPage = lazy(() => import("../pages/configuration/unidades/unidades-page"))
const CreateUnidadPage = lazy(() => import("../pages/configuration/unidades/create-unidad-page"))
const UpdateUnidadPage = lazy(() => import("../pages/configuration/unidades/update-unidad-page"))
const BodegasPage = lazy(() => import("../pages/configuration/bodegas/bodegas-page"))
const CreateBodegaPage = lazy(() => import("../pages/configuration/bodegas/create-bodega-page"))
const UpdateBodegaPage = lazy(() => import("../pages/configuration/bodegas/update-bodega-page"))

export const AppRoutes: FC = () => {
    const navigate = useNavigate()
    const usuarios = useMemo(() => new UsuarioServices(), [])
    const auth = useMemo(() => new AuthServices(), [])
    const store = useMemo(() => new LayoutStore(
        usuarios,
        auth,
        navigate
    ), [usuarios, navigate, auth])
    useEffect(() => {
        return () => {
            (store.dispose)();
        };
    });
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}>
                <Route index element={<ValidateUsernamePage />}></Route>
                <Route path="/login" element={<ValidateLoginPage />}></Route>
            </Route>
            <Route path="/app" element={<Layout store={store} />}>
                <Route index element={<HomePage />}></Route>
                <Route path="perfil" element={<Perfil />}>
                    <Route path="cuenta" element={<CuentaPage />} />
                    <Route path="seguridad" element={<SeguridadPage />} />
                </Route>
                <Route path="configuracion" element={<Configuration />}>
                    <Route path="empresas" element={<EmpresasPage />} />
                    <Route path="usuarios" element={<UsuariosPage />} >
                        <Route path="create" element={<CreateUsuarioPage />} />
                        <Route path=":usuario_id" element={<UpdateUsuarioPage />} />
                    </Route>
                    <Route path="vehiculos" element={<VehiculosPage />} >
                        <Route path="create" element={<CreateVehiculosPage />} />
                        <Route path=":vehiculo_id" element={<UpdateVehiculosPage />} />
                    </Route>
                    <Route path="unidades" element={<UnidadesMedidasPage />}>
                        <Route path="create" element={<CreateUnidadPage />} />
                        <Route path=":unidad_id" element={<UpdateUnidadPage />} />
                    </Route>
                    <Route path="bodegas" element={<BodegasPage />}>
                        <Route path="create" element={<CreateBodegaPage />} />
                        <Route path=":bodega_id" element={<UpdateBodegaPage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
};
