import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Seguridad, SeguridadStore } from "screens/perfil/seguridad"
import { UsuarioServices } from "services/usuario"

const SeguridadPage: FC = () => {
    const navigate = useNavigate()
    const usuario = useMemo(() => new UsuarioServices(), [])
    const store = useMemo(() => new SeguridadStore(
        usuario,
        navigate
    ), [usuario, navigate])
    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
    return(
        <Seguridad store={store}/>
    )
}

export default SeguridadPage