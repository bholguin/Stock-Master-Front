import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Usuarios, UsuariosStore } from "screens/usuarios"
import { UsuarioServices } from "services/usuario"

export const UsuariosPage = () => {

    const navigate = useNavigate()

    const usuario = useMemo(() => new UsuarioServices(
        navigate
    ), [navigate])

    const store = useMemo(() => new UsuariosStore(
        usuario
    ), [usuario])

    return (
        <Usuarios store={store} />
    )
}