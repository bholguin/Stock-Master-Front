import { Route, Routes, useNavigate } from "react-router-dom";
import { FC, lazy, useEffect, useMemo } from "react";
import { Layout, LayoutStore } from "layout";
import { UsuarioServices } from "services/usuario";
import { Configuration } from "screens/configuration";
import { Producto } from "screens/producto"
import { Inventario } from "screens/inventario";
import { AuthServices } from "services/auth";
import { Page404 } from "components/Page404";
import { EmpresaServices } from "services/empresa";

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

const ProductoPage = lazy(() => import("../pages/producto/producto-page/producto-page"))
const CreateProductoPage = lazy(() => import("../pages/producto/producto-page/create-producto-page"))
const UpdateProductoPage = lazy(() => import("../pages/producto/producto-page/update-producto-page"))

const DocumentosPage = lazy(() => import("../pages/configuration/documentos/documentos-page"))
const CreateDocumentoPage = lazy(() => import("../pages/configuration/documentos/create-documento-page"))
const UpdateDocumentoPage = lazy(() => import("../pages/configuration/documentos/update-documento-page"))

const EntradasPage = lazy(() => import("../pages/inventario/entradas/entragas-page"))
const CreateEntradasPage = lazy(() => import("../pages/inventario/entradas/create-entrega-page"))

export const AppRoutes: FC = () => {
    const navigate = useNavigate()
    const usuarios = useMemo(() => new UsuarioServices(), [])
    const auth = useMemo(() => new AuthServices(), [])
    const empresa = useMemo(() => new EmpresaServices(), [])
    const store = useMemo(() => new LayoutStore(
        usuarios,
        auth,
        empresa,
        navigate
    ), [usuarios, navigate, auth, empresa])
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
                <Route path="productos" element={<Producto />}>
                    <Route path="details" element={<ProductoPage />}>
                        <Route path="create" element={<CreateProductoPage />} />
                        <Route path=":producto_id" element={<UpdateProductoPage />} />
                    </Route>
                </Route>
                <Route path="inventario" element={<Inventario />}>
                    <Route path="entradas" element={<EntradasPage />} >
                        <Route path="create" element={<CreateEntradasPage />} />
                    </Route>
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
                    <Route path="documentos" element={<DocumentosPage />}>
                        <Route path="create" element={<CreateDocumentoPage />} />
                        <Route path=":documento_id" element={<UpdateDocumentoPage />} />
                    </Route>
                </Route>
            </Route>
            <Route
                path="*"
                element={<Page404 />}
            />
        </Routes>
    )
};
