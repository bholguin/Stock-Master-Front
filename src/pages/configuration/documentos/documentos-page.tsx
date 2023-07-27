import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { DocumentoStore, Documentos } from "screens/configuration/documentos"
import { TipoDocumentoServices } from "services/tipos-documento"

const DocumentosPage: FC = () => {
  const navigate = useNavigate()
  const documentos = useMemo(() => new TipoDocumentoServices(), [])
  const store = useMemo(() => new DocumentoStore(
    documentos,
    navigate,
  ), [navigate, documentos])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <Documentos store={store} />
  )
}

export default DocumentosPage