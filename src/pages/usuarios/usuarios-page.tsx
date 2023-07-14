import { AxiosInterceptor } from "config/axios"
import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Usuarios, UsuariosStore } from "screens/usuarios"
import { UsuarioServices } from "services/usuario"

export const UsuariosPage: FC = () => {

    const navigate = useNavigate()

    const api = useMemo(() => new AxiosInterceptor(
        navigate
    ), [navigate])

    const usuario = useMemo(() => new UsuarioServices(
        api
    ), [api])

    const store = useMemo(() => new UsuariosStore(
        usuario
    ), [usuario])

    return (
        <Usuarios store={store} />
    )
}

export default UsuariosPage