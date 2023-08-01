import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ViewSalidaBodega, ViewSalidaBodegaStore } from "screens/inventario/salidas/view-salida"
import { SalidasServices } from "services/salida"

const ViewSalidaBodegaPage: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{salida_id: string}>()
  const salida = useMemo(() => new SalidasServices(), [])

  const store = useMemo(() => new ViewSalidaBodegaStore(
    salida,
    navigate,
    params.salida_id
  ), [navigate, salida, params])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <ViewSalidaBodega store={store} />
  )
}

export default ViewSalidaBodegaPage