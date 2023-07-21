import { FC, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Cuenta, CuentaStore } from "screens/perfil/cuenta"
import { UsuarioServices } from "services/usuario"

const CuentaPage: FC = () => {
    const navigate = useNavigate()
    const usuario = useMemo(() => new UsuarioServices(), [])
    const store = useMemo(() => new CuentaStore(
        usuario,
        navigate
    ), [navigate, usuario]);

    return(
        <Cuenta store={store} /> 
    )
}

export default CuentaPage