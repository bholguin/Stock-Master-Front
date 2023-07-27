import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UpdateDocumento, UpdateDocumentoStore } from "screens/configuration/documentos/update-documento"
import { ModulosServices } from "services/modulos"
import { TipoDocumentoServices } from "services/tipos-documento"

const UpdateDocumentoPage: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{documento_id: string}>()
  const documentos = useMemo(() => new TipoDocumentoServices(), [])
  const modulos = useMemo(() => new ModulosServices(), [])
  const store = useMemo(() => new UpdateDocumentoStore(
    documentos,
    modulos,
    navigate,
    params.documento_id
  ), [navigate, documentos, modulos, params])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <UpdateDocumento store={store} />
  )
}

export default UpdateDocumentoPage