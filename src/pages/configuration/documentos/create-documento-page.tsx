import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateDocumento, CreateDocumentoStore } from "screens/configuration/documentos/create-documento"
import { ModulosServices } from "services/modulos"
import { TipoDocumentoServices } from "services/tipos-documento"

const CreateDocumentoPage: FC = () => {
  const navigate = useNavigate()
  const documentos = useMemo(() => new TipoDocumentoServices(), [])
  const modulos = useMemo(() => new ModulosServices(), [])
  const store = useMemo(() => new CreateDocumentoStore(
    documentos,
    modulos,
    navigate,
  ), [navigate, documentos, modulos])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <CreateDocumento store={store} />
  )
}

export default CreateDocumentoPage