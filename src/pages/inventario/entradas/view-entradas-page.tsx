import { FC, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ViewEntradaBodega, ViewEntradaBodegaStore } from "screens/inventario/entradas/view-entrada"
import { EntradaServices } from "services/entrada"

const ViewEntradaBodegaPage: FC = () => {
  const navigate = useNavigate()
  const params = useParams<{entrada_id: string}>()
  const entrada = useMemo(() => new EntradaServices(), [])

  const store = useMemo(() => new ViewEntradaBodegaStore(
    entrada,
    navigate,
    params.entrada_id
  ), [navigate, entrada, params])

  useEffect(() => {
    return () => {
      (store.dispose)();
    };
  });

  return (
    <ViewEntradaBodega store={store} />
  )
}

export default ViewEntradaBodegaPage