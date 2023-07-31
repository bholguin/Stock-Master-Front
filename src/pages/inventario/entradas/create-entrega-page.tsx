import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateEntradaBodega, CreateEntradaBodegaStore } from "screens/inventario/entradas/create-entrada"
import { BodegasServices } from "services/bodegas"
import { EntradaServices } from "services/entrada"
import { ProductosService } from "services/productos"
import { TipoDocumentoServices } from "services/tipos-documento"

const CreateEntradaBodegaPage: FC = () => {
  const navigate = useNavigate()
  const entrada = useMemo(() => new EntradaServices(), [])
  const bodega = useMemo(() => new BodegasServices(), [])
  const tipodoc = useMemo(() => new TipoDocumentoServices(), [])
  const producto = useMemo(() => new ProductosService(), [])
  const store = useMemo(() => new CreateEntradaBodegaStore(
    entrada,
    bodega,
    tipodoc,
    producto,
    navigate,
  ), [navigate, entrada, bodega, tipodoc, producto])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <CreateEntradaBodega store={store} />
  )
}

export default CreateEntradaBodegaPage