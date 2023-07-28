import { FC, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CreateEntradaBodega, CreateEntradaBodegaStore } from "screens/inventario/entradas/create-entrada"
import { BodegasServices } from "services/bodegas"

const CreateEntradaBodegaPage: FC = () => {
  const navigate = useNavigate()
  const bodega = useMemo(() => new BodegasServices(), [])
  const store = useMemo(() => new CreateEntradaBodegaStore(
    bodega,
    navigate,
  ), [navigate, bodega])

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