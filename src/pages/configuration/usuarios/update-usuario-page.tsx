import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateUsuario, UpdateUsuarioStore } from "screens/configuration/usuarios/update-unidad"
import { UsuarioServices } from "services/usuario"

const UpdateUsuarioPage: FC = () => {
    const params = useParams<{usuario_id: string}>()
    const navigate = useNavigate()
    const usuarios = useMemo(() => new UsuarioServices(), [])
    const store = useMemo(() => new UpdateUsuarioStore(
      usuarios,
        navigate,
        params.usuario_id
    ), [navigate, usuarios, params]);

    useEffect(() => {
        return () => {
          (store.dispose)();
        };
      });

    return(
        <UpdateUsuario store={store}/>
    )
}

export default UpdateUsuarioPage