import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Empresas, EmpresasStore } from "screens/configuration/empresas"
import { UsuarioServices } from "services/usuario"

export const EmpresasPage: FC = () => {

    const navigate = useNavigate()

    const usuario = useMemo(() => new UsuarioServices(), [])

    const store = useMemo(() => new EmpresasStore(
        usuario,
        navigate
    ), [usuario, navigate])

    return (
        <Empresas store={store} />
    )
}

export default EmpresasPage