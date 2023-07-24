import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateUsuario, CreateUsuarioStore } from "screens/configuration/usuarios/create-usuario"
import { UsuarioServices } from "services/usuario"

const CreateUsuarioPage: FC = () => {
  const navigate = useNavigate()
  const usuario = useMemo(() => new UsuarioServices(), [])
  const store = useMemo(() => new CreateUsuarioStore(
    usuario,
    navigate,
  ), [navigate, usuario])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <CreateUsuario store={store} />
  )
}

export default CreateUsuarioPage