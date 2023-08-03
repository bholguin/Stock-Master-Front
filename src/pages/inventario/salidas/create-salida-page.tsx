import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateSalidaBodega, CreateSalidaBodegaStore } from "screens/inventario/salidas/create-salida"
import { BodegasServices } from "services/bodegas"
import { ProductosService } from "services/productos"
import { SalidasServices } from "services/documento/salida"
import { TipoDocumentoServices } from "services/tipos-documento"

const CreatSalidaBodegaPage: FC = () => {
  const navigate = useNavigate()
  const salida = useMemo(() => new SalidasServices(), [])
  const bodega = useMemo(() => new BodegasServices(), [])
  const tipodoc = useMemo(() => new TipoDocumentoServices(), [])
  const producto = useMemo(() => new ProductosService(), [])
  const store = useMemo(() => new CreateSalidaBodegaStore(
    salida,
    bodega,
    tipodoc,
    producto,
    navigate,
  ), [navigate, salida, bodega, tipodoc, producto])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <CreateSalidaBodega store={store} />
  )
}

export default CreatSalidaBodegaPage