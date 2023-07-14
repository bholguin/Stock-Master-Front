import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Usuarios, UsuariosStore } from "screens/usuarios"
import { UsuarioServices } from "services/usuario"

export const UsuariosPage: FC = () => {

    const navigate = useNavigate()

    const usuario = useMemo(() => new UsuarioServices(), [])

    const store = useMemo(() => new UsuariosStore(
        usuario,
        navigate
    ), [usuario, navigate])

    return (
        <Usuarios store={store} />
    )
}

export default UsuariosPage