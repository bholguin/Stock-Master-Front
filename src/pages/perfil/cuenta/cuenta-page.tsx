import { FC, useEffect, useMemo } from "react"
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

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });
    

    return(
        <Cuenta store={store} /> 
    )
}

export default CuentaPage